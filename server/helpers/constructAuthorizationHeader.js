module.exports = function constructAuthorizationHeader(params) {
  let baseHeader = 'OAuth ';
  let resultsArray = [];

  for (key in params) {
    resultsArray.push(`${key}="${params[key]}"`);
  }

  // used an array to avoid a trailing comma on the last key
  let resultsString = resultsArray.join(',');

  return baseHeader + resultsString;
}

// Sample constructed Authorization Header
// OAuth oauth_consumer_key="xHkW9aeTnoYk4k1lUYicCjbKY9VXjYOWxE3OsBt8",
// oauth_signature_method="HMAC-SHA1",
// oauth_timestamp="1486610109",
// oauth_nonce="461599851",
// oauth_version="1.0",
// oauth_token="yEZPtN5Eeyc7JRAcbXECmAzaVy2pDBbRAKLYBVe3",
// oauth_signature="2r5uIJmQn1CB3fik91%2B%2FJS%2BvcwQ%3D"
