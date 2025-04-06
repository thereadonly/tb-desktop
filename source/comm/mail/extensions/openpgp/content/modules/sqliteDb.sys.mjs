/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

/**
 * Module that provides generic functions for the OpenPGP SQLite database.
 */
const lazy = {};
ChromeUtils.defineESModuleGetters(lazy, {
  EnigmailKeyRing: "chrome://openpgp/content/modules/keyRing.sys.mjs",
  Sqlite: "resource://gre/modules/Sqlite.sys.mjs",
  setTimeout: "resource://gre/modules/Timer.sys.mjs",
});
ChromeUtils.defineLazyGetter(lazy, "log", () => {
  return console.createInstance({
    prefix: "openpgp",
    maxLogLevel: "Warn",
    maxLogLevelPref: "openpgp.loglevel",
  });
});

export var PgpSqliteDb2 = {
  /** @returns {Promise<OpenedConnection>} */
  openDatabase() {
    return new Promise((resolve, reject) => {
      openDatabaseConn(
        "openpgp.sqlite",
        resolve,
        reject,
        100,
        Date.now() + 10000
      );
    });
  },

  /**
   * Check database structure is ok.
   *
   * @throws {Error} if the structure is not ok.
   */
  async checkDatabaseStructure() {
    let conn;
    try {
      conn = await this.openDatabase();
      await checkAcceptanceTable(conn);
      await conn.close();
    } catch (ex) {
      lazy.log.error("Check db structure FAILED.", ex);
      if (conn) {
        await conn.close();
      }
      throw ex;
    }
  },

  accCacheFingerprint: "",
  accCacheValue: "",
  accCacheEmails: null,

  /**
   * @param {Promise<OpenedConnection>} conn
   * @param {string} fingerprint
   */
  async getFingerprintAcceptance(conn, fingerprint) {
    // 40 is for modern fingerprints, 32 for older fingerprints.
    if (fingerprint.length != 40 && fingerprint.length != 32) {
      throw new Error(`Invalid fingerprint: ${fingerprint}`);
    }

    fingerprint = fingerprint.toLowerCase();
    if (fingerprint == this.accCacheFingerprint) {
      return this.accCacheValue;
    }

    let myConn = false;
    let rv = "";

    try {
      if (!conn) {
        myConn = true;
        conn = await this.openDatabase();
      }

      await conn
        .execute("select decision from acceptance_decision where fpr = :fpr", {
          fpr: fingerprint,
        })
        .then(result => {
          if (result.length) {
            rv = result[0].getResultByName("decision");
          }
        });
    } catch (ex) {
      console.warn(ex);
    }

    if (myConn && conn) {
      await conn.close();
    }
    return rv;
  },

  /**
   * Check if the given email has a positively accepted key.
   *
   * @param {string} email
   * @returns {boolean} true if it has an accepted key.
   */
  async hasAnyPositivelyAcceptedKeyForEmail(email) {
    email = email.toLowerCase();
    let count = 0;

    let conn;
    try {
      conn = await this.openDatabase();

      const result = await conn.execute(
        "select count(decision) as hits from acceptance_email" +
          " inner join acceptance_decision on" +
          " acceptance_decision.fpr = acceptance_email.fpr" +
          " where (decision = 'verified' or decision = 'unverified')" +
          " and lower(email) = :email",
        { email }
      );
      if (result.length) {
        count = result[0].getResultByName("hits");
      }
      await conn.close();
    } catch (ex) {
      if (conn) {
        await conn.close();
      }
      throw ex;
    }

    if (!count) {
      return Boolean(await lazy.EnigmailKeyRing.getSecretKeyByEmail(email));
    }
    return true;
  },

  /**
   * Get acceptance for the specified fingerprint + email combination.
   *
   * @param {string} fingerprint
   * @param {string} email
   * @param {object} rv - Out object.
   * FIXME: use return value instead.
   */
  async getAcceptance(fingerprint, email, rv) {
    fingerprint = fingerprint.toLowerCase();
    email = email.toLowerCase();

    rv.emailDecided = false;
    rv.fingerprintAcceptance = "";

    if (fingerprint == this.accCacheFingerprint) {
      if (
        this.accCacheValue.length &&
        this.accCacheValue != "undecided" &&
        this.accCacheEmails &&
        this.accCacheEmails.has(email)
      ) {
        rv.emailDecided = true;
        rv.fingerprintAcceptance = this.accCacheValue;
      }
      return;
    }

    let conn;
    try {
      conn = await this.openDatabase();

      rv.fingerprintAcceptance = await this.getFingerprintAcceptance(
        conn,
        fingerprint
      );

      if (rv.fingerprintAcceptance) {
        await conn
          .execute(
            "select count(*) from acceptance_email where fpr = :fpr and email = :email",
            {
              fpr: fingerprint,
              email,
            }
          )
          .then(result => {
            if (result.length) {
              const count = result[0].getResultByName("count(*)");
              rv.emailDecided = count > 0;
            }
          });
      }
      await conn.close();
    } catch (ex) {
      if (conn) {
        await conn.close();
      }
      throw ex;
    }
  },

  /**
   * @param {OpenedConnection} conn - Connection.
   * @param {string} fingerprint - Fingerprint; must be lowercase already.
   */
  async _deleteAcceptanceNoTransaction(conn, fingerprint) {
    const delObj = { fpr: fingerprint };
    await conn.execute(
      "delete from acceptance_decision where fpr = :fpr",
      delObj
    );
    await conn.execute("delete from acceptance_email where fpr = :fpr", delObj);
  },

  /**
   * Delete acceptance for the given fingerprint.
   *
   * @param {string} fingerprint
   */
  async deleteAcceptance(fingerprint) {
    fingerprint = fingerprint.toLowerCase();
    this.accCacheFingerprint = fingerprint;
    this.accCacheValue = "";
    this.accCacheEmails = null;
    let conn;
    try {
      conn = await this.openDatabase();
      await conn.execute("begin transaction");
      await this._deleteAcceptanceNoTransaction(conn, fingerprint);
      await conn.execute("commit transaction");
      await conn.close();
      Services.obs.notifyObservers(null, "openpgp-acceptance-change");
    } catch (ex) {
      if (conn) {
        await conn.close();
      }
      throw ex;
    }
  },

  /**
   * Convenience function that will add one accepted email address,
   * either to an already accepted key, or as unverified to an undecided
   * key. It is an error to call this API for a rejected key, or for
   * an already accepted email address.
   *
   * @param {string} fingerprint
   * @param {string} email
   */
  async addAcceptedEmail(fingerprint, email) {
    fingerprint = fingerprint.toLowerCase();
    email = email.toLowerCase();
    let conn;
    try {
      conn = await this.openDatabase();

      const fingerprintAcceptance = await this.getFingerprintAcceptance(
        conn,
        fingerprint
      );

      let fprAlreadyAccepted = false;

      switch (fingerprintAcceptance) {
        case "undecided":
        case "":
        case undefined:
          break;

        case "unverified":
        case "verified":
          fprAlreadyAccepted = true;
          break;

        default:
          throw new Error(
            "invalid use of addAcceptedEmail() with existing acceptance " +
              fingerprintAcceptance
          );
      }

      this.accCacheFingerprint = "";
      this.accCacheValue = "";
      this.accCacheEmails = null;

      if (!fprAlreadyAccepted) {
        await conn.execute("begin transaction");
        // start fresh, clean up old potential email decisions
        this._deleteAcceptanceNoTransaction(conn, fingerprint);

        await conn.execute(
          "insert into acceptance_decision values (:fpr, :decision)",
          {
            fpr: fingerprint,
            decision: "unverified",
          }
        );
      } else {
        await conn
          .execute(
            "select count(*) from acceptance_email where fpr = :fpr and email = :email",
            {
              fpr: fingerprint,
              email,
            }
          )
          .then(result => {
            if (result.length && result[0].getResultByName("count(*)") > 0) {
              throw new Error(
                `${email} already has acceptance for ${fingerprint}`
              );
            }
          });

        await conn.execute("begin transaction");
      }

      await conn.execute("insert into acceptance_email values (:fpr, :email)", {
        fpr: fingerprint,
        email,
      });

      await conn.execute("commit transaction");
      await conn.close();
      Services.obs.notifyObservers(null, "openpgp-acceptance-change");
    } catch (ex) {
      if (conn) {
        await conn.close();
      }
      throw ex;
    }
  },

  async updateAcceptance(fingerprint, emailArray, decision) {
    fingerprint = fingerprint.toLowerCase();
    let conn;
    try {
      const uniqueEmails = new Set();
      if (decision !== "undecided") {
        if (emailArray) {
          for (let email of emailArray) {
            if (!email) {
              continue;
            }
            email = email.toLowerCase();
            if (uniqueEmails.has(email)) {
              continue;
            }
            uniqueEmails.add(email);
          }
        }
      }

      this.accCacheFingerprint = fingerprint;
      this.accCacheValue = decision;
      this.accCacheEmails = uniqueEmails;

      conn = await this.openDatabase();
      await conn.execute("begin transaction");
      await this._deleteAcceptanceNoTransaction(conn, fingerprint);

      if (decision !== "undecided") {
        const decisionObj = {
          fpr: fingerprint,
          decision,
        };
        await conn.execute(
          "insert into acceptance_decision values (:fpr, :decision)",
          decisionObj
        );

        // Rejection is global for a fingerprint, don't need to
        // store email address records.

        if (decision !== "rejected") {
          // A key might contain multiple user IDs with the same email
          // address. We add each email only once.
          for (const email of uniqueEmails) {
            await conn.execute(
              "insert into acceptance_email values (:fpr, :email)",
              {
                fpr: fingerprint,
                email,
              }
            );
          }
        }
      }
      await conn.execute("commit transaction");
      await conn.close();
      Services.obs.notifyObservers(null, "openpgp-acceptance-change");
    } catch (ex) {
      if (conn) {
        await conn.close();
      }
      throw ex;
    }
  },

  async acceptAsPersonalKey(fingerprint) {
    this.updateAcceptance(fingerprint, null, "personal");
  },

  async deletePersonalKeyAcceptance(fingerprint) {
    this.deleteAcceptance(fingerprint);
  },

  async isAcceptedAsPersonalKey(fingerprint) {
    const result = await this.getFingerprintAcceptance(null, fingerprint);
    return result === "personal";
  },
};

/**
 * Use a promise to open the OpenPGP database.
 *
 * It's possible that there will be an NS_ERROR_STORAGE_BUSY
 * so we're willing to retry for a little while.
 *
 * @param {string} filename - Path of the sqlite database.
 * @param {Function} resolve - Function to call when promise succeeds.
 * @param {Function} reject - Function to call when promise fails.
 * @param {integer} waitms - Number of milliseconds to wait before trying again
 *   in case of NS_ERROR_STORAGE_BUSY.
 * @param {integer} maxtime - Unix epoch (in milliseconds) of the point at
 *   which we should give up.
 */
function openDatabaseConn(filename, resolve, reject, waitms, maxtime) {
  lazy.Sqlite.openConnection({
    path: filename,
    sharedMemoryCache: false,
  })
    .then(connection => {
      resolve(connection);
    })
    .catch(error => {
      const now = Date.now();
      if (now > maxtime) {
        reject(error);
        return;
      }
      lazy.setTimeout(function () {
        openDatabaseConn(filename, resolve, reject, waitms, maxtime);
      }, waitms);
    });
}

/** @param {OpenedConnection} connection */
async function checkAcceptanceTable(connection) {
  const exists = await connection.tableExists("acceptance_email");
  const exists2 = await connection.tableExists("acceptance_decision");
  if (!exists || !exists2) {
    await createAcceptanceTable(connection);
  }
}

/** @param {OpenedConnection} connection */
async function createAcceptanceTable(connection) {
  await connection.execute(
    "create table acceptance_email (" +
      "fpr text not null, " +
      "email text not null, " +
      "unique(fpr, email));"
  );

  await connection.execute(
    "create table acceptance_decision (" +
      "fpr text not null, " +
      "decision text not null, " +
      "unique(fpr));"
  );

  await connection.execute(
    "create unique index acceptance_email_i1 on acceptance_email(fpr, email);"
  );

  await connection.execute(
    "create unique index acceptance__decision_i1 on acceptance_decision(fpr);"
  );
}
