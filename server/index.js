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
const CONSTANTS = require('./constants');

// Controllers
const PhotosController = require('./controllers/PhotosController');

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
    consumerKey: CONSTANTS.CONSUMER_KEY,
    consumerSecret: CONSTANTS.CONSUMER_SECRET,
    callbackURL: CONSTANTS.CALLBACK_URL,
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

// Routes
app.get('/', function(req, res) {
  res.send({ message: 'success!' });
});


// Photos
app.get('/photos', PhotosController.getPhotos);
app.post('/photos/:id/vote', PhotosController.likePhoto);


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

    res.redirect(`${CONSTANTS.CLIENT_URL}?oauth_token=${req.query.oauth_token}`);
  }
);


/*
  Server setup
*/

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);
console.log('Server listening on:', port);
