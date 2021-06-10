const admin = require("firebase-admin");

const config = require("./firebase-keys.json");

admin.initializeApp({
  credential: admin.credential.cert(config),
});

const db = admin.firestore();

module.exports = db;
