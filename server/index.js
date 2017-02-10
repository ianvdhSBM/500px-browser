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
const generateRandomString = require('./helpers/generateRandomString');


const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;

// URLs
const ROOT_URL = 'https://api.500px.com/v1/photos';
const LIKE_PHOTO_URL_SETTINGS = '/vote?vote=1';
const CONSUMER_KEY_SETTING = `?consumer_key=${CONSUMER_KEY}&`;
const GET_PHOTOS_URL_SETTINGS = 'feature=popular&sort=created_at&image_size=3&include_store=store_download&include_states=voted&rpp=100';
const CALLBACK_URL = 'http://localhost:3000/login/500px/callback/';
const CLIENT_URL = 'http://localhost:8080';


// Constructed URLs
const API_URL_GET_PHOTOS = `${ROOT_URL}${CONSUMER_KEY_SETTING}${GET_PHOTOS_URL_SETTINGS}`;

/*
  Passport setup
*/

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new _500pxStrategy({
    consumerKey: CONSUMER_KEY,
    consumerSecret: CONSUMER_SECRET,
    callbackURL: CALLBACK_URL,
  },
  function(token, tokenSecret, profile, done) {
    done(null, profile);
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

// Routes
app.get('/', function(req, res) {
  res.send({ message: 'success!' });
});

app.get('/photos', function(req, res) {
  request(API_URL_GET_PHOTOS, function(error, response, body) {
    if (error) {
      res.send({ error: error });
    }
    if (response.statusCode == 200) {
      res.send(body);
    }
  });
});

app.post('/photos/:id/vote', function(req, res) {
  const photoId = req.params.id;
  const oauthToken = res.req.body.oauth_token;
  const url = `${ROOT_URL}/${photoId}${LIKE_PHOTO_URL_SETTINGS}`

  const options = {
    url: url,
    headers: {
      Authorization: 'OAuth',
      oauth_token: oauthToken,
      oauth_consumer_key: CONSUMER_KEY,
      oauth_consumer_secret: CONSUMER_SECRET,
      oauth_version: '1.0',
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: Date.now(),
      oauth_nonce: generateRandomString(),
    },
  };

  // const finalUrl = `${options.url}&oauth_token=${options.params.oauth_token}&oauth_consumer_key=${options.params.oauth_consumer_key}&oauth_consumer_secret=${options.params.oauth_consumer_secret}&oauth_version=${options.params.oauth_version}&oauth_signature_method=${options.params.oauth_signature_method}&oauth_timestamp=${options.params.oauth_timestamp}&oauth_nonce=${options.params.oauth_nonce}`;

  // console.log('FINAL', finalUrl);
  request.post(options, function(err, response, body) {
    // console.log('res', response);
    // console.log('body' body);
    if (err) {
      console.log('ERROR!!!!', err);
      res.send({ error: err });
    }
    console.log('RESPONSE WHOA', response);
    console.log('BODY OMG!!', body);
    if (response.statusCode == 200) {
      res.send(body);
    }
  });
});


// OAuth route
app.get('/login/500px',
  passport.authenticate('500px'),
  function(req, res) {
    // Never gets called. Passport redirects user to 500px for auth.
    // Reponse comes back to callback route below.
  }
);

// OAuth Callback route
app.get('/login/500px/callback',
  passport.authenticate('500px', { failureRedirect: '/' }),
  function(req, res) {

    res.redirect(`${CLIENT_URL}?oauth_token=${req.query.oauth_token}`);
  }
);


/*
  Server setup
*/

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);
console.log('Server listening on:', port);
