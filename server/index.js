const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const _500pxStrategy = require('passport-500px').Strategy;

/*
  App setup
*/

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));


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
