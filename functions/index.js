const functions = require('firebase-functions');
const express = require('express');

const app = express();

//route
const notices = require('./routes/notices');

//midlle
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin',  'http://localhost:8080');
 // res.header('Access-Control-Allow-Origin',  'https://team-tool-demo.firebaseapp.com');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next()
})

app.use('/team-api/notices', notices);

exports.widgets = functions.https.onRequest(app);
