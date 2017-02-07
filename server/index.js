// Initialize dotenv to add consumer key and secret to proces.env
require('dotenv').config();

const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const passport = require('passport');
const _500pxStrategy = require('passport-500px').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');


const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;

// URLs
const ROOT_URL = 'https://api.500px.com/v1/photos?';
const CONSUMER_KEY_SETTING = `consumer_key=${CONSUMER_KEY}&`;
const URL_SETTINGS = 'feature=popular&sort=created_at&image_size=3&include_store=store_download&include_states=voted&rpp=100';
const CALLBACK_URL = 'http://localhost:3000/login/500px/callback/';
const CLIENT_URL = 'http://localhost:8080';


/*
  Passport setup
*/

passport.serializeUser(function(user, done) {
  console.log('SERIALIZING', user);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log('DE-SERIALIZING', obj);
  done(null, obj);
});

passport.use(new _500pxStrategy({
    consumerKey: CONSUMER_KEY,
    consumerSecret: CONSUMER_SECRET,
    callbackURL: CALLBACK_URL,
  },
  function(token, tokenSecret, profile, done) {
    done(null, profile);
    // User.findOrCreate({ '500pxId': profile.id}, function(err, user) {
    //   return done(err, user);
    // });
  }
));

/*
  App setup
*/

const app = express();


app.use(morgan('combined'));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({ type: '*/*' }));
app.use(session({
  secret: 'The rain in Spain falls mainly in the plains',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));



const API_URL_GET_PHOTOS = `${ROOT_URL}${CONSUMER_KEY_SETTING}${URL_SETTINGS}`;

// Routes
app.get('/', function(req, res) {
  res.send({ message: 'success!' });
});

app.get('/photos', function(req, res) {
  request(API_URL_GET_PHOTOS, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
    if (error) {
      res.send({ error: error });
    }
  });
});

app.get('/login/500px',
  passport.authenticate('500px'),
  function(req, res) {

  });

app.get('/login/500px/callback',
  passport.authenticate('500px', { failureRedirect: '/' }),
  function(req, res) {
    console.log('IN HERE', req.query);
    res.redirect(`${CLIENT_URL}?oauth=${req.query.oauth_token}`);
  });

/*
  Server setup
*/

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);
console.log('Server listening on:', port);
