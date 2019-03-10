//Express Setting
const express = require('express');
const router = express.Router();

//firestore
/*
const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
*/

/* GET users listing. */
router.get('/', (req, res, next) => {
  return res.send('Test')
/*
  db.collection('boards').get()
    .then((snapshot) => {
      const items = snapshot.docs.map(doc => doc.data());
    return res.json(items);
  })
    .catch((err) => {
      return res.send(err);
  });*/
});

module.exports = router;
