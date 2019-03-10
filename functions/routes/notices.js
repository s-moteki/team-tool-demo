const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

//GET
router.get('/', (req, res, next) => {
  db.collection('notices').orderBy('created_at','desc').get()
    .then((snapshot) => {
      const items = snapshot.docs.map(doc => doc.data());
      console.log('-------access--------');
     return res.json(items);
  })
    .catch((err) => {
      return res.send(err);
  });
});

//post
router.post('/add', function(req, res) {
  req.body.created_at = new Date().toString();
  console.log(req.body);
　const addDoc = db.collection('notices').add(req.body)
  .then(ref => {
    console.log('Added document with ID: ', ref.id);
    res.send('success');
  }).catch((error) => {
    throw new Error(error)
  });
})

module.exports = router;
