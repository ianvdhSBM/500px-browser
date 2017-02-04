// Initialize dotenv to add consumer key and secret to proces.env
require('dotenv').config();

const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

/*
  App setup
*/

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

// Configure passport
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;


// Routes
app.get('/', function(req, res, next) {
  res.send({ message: 'success!' });
});


/*
  Server setup
*/

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);
console.log('Server listening on:', port);
