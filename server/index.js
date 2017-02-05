// Initialize dotenv to add consumer key and secret to proces.env
require('dotenv').config();

const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');

/*
  App setup
*/


const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors());

// Configure passport
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;


// API URLs
const ROOT_URL = 'https://api.500px.com/v1/photos?';
const CONSUMER_KEY_SETTING = `consumer_key=${CONSUMER_KEY}&`;
const URL_SETTINGS = 'feature=popular&sort=created_at&image_size=3&include_store=store_download&include_states=voted&rpp=100';

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

app.get('/login', function(req, res) {
  res.send('request received!');
});

/*
  Server setup
*/

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);
console.log('Server listening on:', port);
