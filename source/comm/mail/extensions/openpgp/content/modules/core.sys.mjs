/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const lazy = {};
ChromeUtils.defineESModuleGetters(lazy, {
  EnigmailVerify: "chrome://openpgp/content/modules/mimeVerify.sys.mjs",
  EnigmailMimeEncrypt: "chrome://openpgp/content/modules/mimeEncrypt.sys.mjs",
  PgpSqliteDb2: "chrome://openpgp/content/modules/sqliteDb.sys.mjs",
});

export var EnigmailCore = {
  _initialized: false,

  /**
   * Initialize the main parts of Enigmail
   */
  async init() {
    if (this._initialized) {
      return;
    }

    await lazy.PgpSqliteDb2.checkDatabaseStructure();

    this.factories = [];

    lazy.EnigmailVerify.registerPGPMimeHandler();
    //EnigmailFiltersWrapper.onStartup();

    lazy.EnigmailMimeEncrypt.init();
    this.factories.push(new Factory(lazy.EnigmailMimeEncrypt.Handler));

    this._initialized = true;
  },
};

///////////////////////////////////////////////////////////////////////////////
// Enigmail encryption/decryption service
///////////////////////////////////////////////////////////////////////////////

class Factory {
  constructor(component) {
    this.component = component;
    this.register();
    Object.freeze(this);
  }

  createInstance() {
    return new this.component();
  }

  register() {
    Components.manager
      .QueryInterface(Ci.nsIComponentRegistrar)
      .registerFactory(
        this.component.prototype.classID,
        this.component.prototype.classDescription,
        this.component.prototype.contractID,
        this
      );
  }

  unregister() {
    Components.manager
      .QueryInterface(Ci.nsIComponentRegistrar)
      .unregisterFactory(this.component.prototype.classID, this);
  }
}
