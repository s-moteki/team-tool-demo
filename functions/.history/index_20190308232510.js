const functions = require('firebase-functions')
import express from 'express'
import cookieParser from 'cookie-parser'


const app = express()

//route
const test = require('./routes/test')

//midlle
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin',  'http://localhost:8080')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

app.use('/api-test/', test)
app.get('/api/test', (req, res) => res.send("testtesttest"))

exports.widgets = functions.https.onRequest(app)
