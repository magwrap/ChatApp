/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
import * as functions from "firebase-functions";

import Filter = require("bad-words");

import admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

exports.detectEvilUsers = functions.firestore
  .document("messages/{msgID}")
  .onCreate(async (doc, ctx) => {
    const filter = new Filter();
    const { text, uid } = doc.data();

    if (filter.isProfane(text)) {
      const cleaned = filter.clean(text);
      // eslint-disable-next-line object-curly-spacing
      await doc.ref.update({ text: "I got banned for saying bad things" });

      await db.collection("banned").doc(uid).set({});
    }
  });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
