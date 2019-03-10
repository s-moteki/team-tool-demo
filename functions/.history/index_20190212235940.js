const functions = require('firebase-functions');
const express = require('express');
const cookieParser = require('cookie-parser');


const app = express();

//route
const test = require('./routes/test');


//midlle
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//テスト用クロスオリジン
/*
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin',  'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api-test/', test);
app.get('/api/test', (req, res) => res.send("testtesttest"));

var http = require('http');
var https = require('https');
var url = require('url');
var qs = require('querystring');

http.createServer(function (req, res) {
  // This time we don't store access token,
  // but please store access token and reuse in production code...
  var query = url.parse(req.url, true).query;
  if('code' in query) {
    // Get access token
    getAccessToken(query.code, function(jsonAuth) {
      // Get messages from Office 365 (Exchange Online)
      res.writeHead(200,
     { 'Content-Type': 'text/html; charset=utf-8' });
      var msgbody = '';
      getExchangeMessage(JSON.parse(jsonAuth).access_token,
   function(jsonMsg) {
        msgbody += jsonMsg;
      }, function() {
        var msgobj = JSON.parse(msgbody).value;
        for(var i = 0; i < msgobj.length; i++) {
          var msg = msgobj[i];
          res.write(msg.Subject + '<br />');
        }
        res.end();
      });
    });
  }
  else {
    // Redirect to login
    res.writeHead(302, {
      'Location':
        'https://login.microsoftonline.com/common/oauth2/authorize?response_type=code&client_id=da203772-d60c-43a9-8f05-9316a8addafb&resource='
          + encodeURIComponent('https://outlook.office365.com/')
          + '&redirect_uri='
          + encodeURIComponent('https://tsmatsuz-msc01.azurewebsites.net/')
    });
    res.end();    
  }
}).listen(process.env.PORT);

function getAccessToken(code, callback) {
  var postdata = qs.stringify({
    'grant_type' : 'authorization_code',
    'code' : code,
    'client_id' : 'da203772-d60c-43a9-8f05-9316a8addafb',
    'client_secret' : 'muMXQNh8JRZ . . .',
    'redirect_uri' : 'https://tsmatsuz-msc01.azurewebsites.net/'
  });
  var opt = {
    host : 'login.windows.net',
    port : 443,
    path : '/common/oauth2/token',
    method : 'POST',
    headers : {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postdata)
    }
  };
  var authreq = https.request(opt, function(authres) {
    authres.setEncoding('utf-8');
    authres.on('data', callback);
  });
  authreq.write(postdata);
  authreq.end();
}

function getExchangeMessage(access_token, datacallback, endcallback) {
  var opt = {
    host : 'outlook.office365.com',
    port : 443,
    path : '/api/v1.0/me/messages?$top=10&$orderby=DateTimeSent%20desc&$select=Subject,DateTimeReceived,From',
    method : 'GET',
    headers : {
      'Authorization' : 'Bearer ' + access_token,
      'Content-Length': 0
    }
  };
  var o365req = https.request(opt, function(o365res) {
    o365res.setEncoding('utf-8');
    o365res.on('data', datacallback);
    o365res.on('end', endcallback);
  });
  o365req.end();
}

*/

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);