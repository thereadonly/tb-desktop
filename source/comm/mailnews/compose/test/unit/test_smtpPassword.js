/**
 * Authentication tests for SMTP.
 */

var { MailServices } = ChromeUtils.importESModule(
  "resource:///modules/MailServices.sys.mjs"
);
const { PromiseTestUtils } = ChromeUtils.importESModule(
  "resource://testing-common/mailnews/PromiseTestUtils.sys.mjs"
);

/* import-globals-from ../../../test/resources/passwordStorage.js */
load("../../../resources/passwordStorage.js");

var server;

var kIdentityMail = "identity@foo.invalid";
var kSender = "from@foo.invalid";
var kTo = "to@foo.invalid";
var kUsername = "testsmtp";
// Password needs to match the login information stored in the signons json
// file.
var kPassword = "smtptest";

add_task(async function () {
  function createHandler(d) {
    var handler = new SMTP_RFC2821_handler(d);
    // Username needs to match the login information stored in the signons json
    // file.
    handler.kUsername = kUsername;
    handler.kPassword = kPassword;
    handler.kAuthRequired = true;
    return handler;
  }
  server = setupServerDaemon(createHandler);

  // Prepare files for passwords (generated by a script in bug 1018624).
  await setupForPassword("signons-mailnews1.8.json");

  // Test file
  var testFile = do_get_file("data/message1.eml");

  // Ensure we have at least one mail account
  localAccountUtils.loadLocalMailAccount();

  // Handle the server in a try/catch/finally loop so that we always will stop
  // the server if something fails.
  try {
    // Start the fake SMTP server. The server's socket type defaults to
    // Ci.nsMsgSocketType.plain, so no need to set it.
    server.start();
    var smtpServer = getBasicSmtpServer(server.port);
    var identity = getSmtpIdentity(kIdentityMail, smtpServer);

    // This time with auth
    test = "Auth sendMailMessage";

    smtpServer.authMethod = Ci.nsMsgAuthMethod.passwordCleartext;
    smtpServer.username = kUsername;

    const messageId = Cc["@mozilla.org/messengercompose/computils;1"]
      .createInstance(Ci.nsIMsgCompUtils)
      .msgGenerateMessageId(identity, null);

    const listener = new PromiseTestUtils.PromiseMsgOutgoingListener();
    smtpServer.sendMailMessage(
      testFile,
      MailServices.headerParser.parseEncodedHeaderW(kTo),
      [],
      identity,
      kSender,
      null,
      null,
      false,
      messageId,
      listener
    );

    await listener.promise;

    var transaction = server.playTransaction();
    do_check_transaction(transaction, [
      "EHLO test",
      "AUTH PLAIN " + AuthPLAIN.encodeLine(kUsername, kPassword),
      "MAIL FROM:<" + kSender + "> BODY=8BITMIME SIZE=159",
      "RCPT TO:<" + kTo + ">",
      "DATA",
    ]);
  } catch (e) {
    do_throw(e);
  } finally {
    server.stop();

    var thread = Services.tm.currentThread;
    while (thread.hasPendingEvents()) {
      thread.processNextEvent(true);
    }
  }
});
