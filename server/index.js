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
const oauthSignature = require('oauth-signature');

// helpers
const generateRandomString = require('./helpers/generateRandomString');
const constructOAuthUrl = require('./helpers/constructOAuthUrl');
const constructAuthorizationHeader = require('./helpers/constructAuthorizationHeader');

const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;

// URLs
const ROOT_URL = 'https://api.500px.com/v1/photos';
const LIKE_PHOTO_URL_SETTINGS = '/vote?vote=1';
const CONSUMER_KEY_SETTING = `?consumer_key=${CONSUMER_KEY}&`;
const GET_PHOTOS_URL_SETTINGS = 'feature=popular&sort=created_at&image_size=3&include_store=store_download&include_states=voted&rpp=100';
const CALLBACK_URL = 'http://localhost:3000/login/500px/callback/';
const CLIENT_URL = 'http://localhost:8080';


// Constructed URL
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
      return res.send({ error: error });
    }

    if (!response) {
      return res.send({ error: 'error', statusCode: 'Unknown' });
    }

    if (response.statusCode == 200) {
      return res.send(body);
    }

    // only reaches here if the statusCode is not 200 - for error handling
    res.send(body);
  });
});

app.post('/photos/:id/vote', function(req, res) {
  const photoId = req.params.id;
  const oauthToken = res.req.body.oauth_token;
  const baseUrl = `${ROOT_URL}/${photoId}${LIKE_PHOTO_URL_SETTINGS}`

  const params = {
    oauth_token: oauthToken,
    oauth_consumer_key: CONSUMER_KEY,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Date.now(),
    oauth_nonce: generateRandomString(),
    oauth_version: '1.0',
  };

  // generates oauth_signature
  // null field is optional token_secret
  const signature = oauthSignature.generate('POST', baseUrl, params, CONSUMER_SECRET);

  params['oauth_signature'] = signature;

  // const constructedUrl = constructOAuthUrl(baseUrl, params);
  const authorizationHeader = constructAuthorizationHeader(params);

  const options = {
    url: baseUrl,
    headers: {
      Authorization: authorizationHeader,
    },
  };

  // Tried passing in either the options or constructedUrl
  // as the first argument below.
  // Passing in options (with the signature containing 'null' for the token_secret above),
  // cause a 500 error.
  // Passing in the constructedUrl causes a 401 error.
  request.post(options, function(err, response, body) {
    if (err) {
      console.log('ERROR!!!!', err);
      res.send({ error: err });
    }

    if (response.statusCode === 200) {
      res.send(body);
    }

    res.send(response);
  });
});


// OAuth route
app.get('/login/500px',
  passport.authenticate('500px'),
  function(req, res) {
    // Never gets called. Passport redirects user to 500px for auth.
    // Reponse comes back to /callback route below.
  }
);

// OAuth Callback route
app.get('/login/500px/callback',
  passport.authenticate('500px', { failureRedirect: '/' }),
  function(req, res) {
    // console.log('REQUEST', req);

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
