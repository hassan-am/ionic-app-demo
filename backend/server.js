if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const cors = require('cors')
const http = require('http')
const request = require('request')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt')
const passport = require('passport')
const session = require('express-session')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const dbconfig = require('./config/db-config.js')

const app = express()

app.use(cors())

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie:{httpOnly:true/*, secure: true*/},
    resave: false,
    saveUninitialized: false
}))

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static("public"))

const initializePassport = require('./config/passport-config')
initializePassport(passport)

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


// const allowedOrigins = [
//     'capacitor://localhost',
//     'ionic://localhost',
//     'http://localhost',
//     'http://localhost:8080',
//     'http://localhost:8100',
//     'http://localhost:8100/home',
//     'http://192.168.1.1:8100'
// ];

// // Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
// const corsOptions = {
//   origin: (origin, callback) => {
    
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Origin not allowed by CORS'));
//     }
//   },
// //   credentials:true
// }

// // Enable preflight requests for all routes
// app.options('*', cors(corsOptions));

// connect to db
mongoose.connect(dbconfig.url)

mongoose.connection.on('error', function (err) {
    console.log('Could not connect to the database: ' + err)
    process.exit()
});

mongoose.connection.once('open', function () {
    console.log('Successfully connected to the database')
    console.log('--------------------------------------')
});



// start server
var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("app listening at http://%s:%s", host, port)

    // require routes
var routes = require('./routes/routes')
// routes(app, passport, corsOptions) // attach app & passport modules to routes
routes(app, passport) // attach app & passport modules to routes

})