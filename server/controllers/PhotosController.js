const request = require('request');
const CONSTANTS = require('../constants');
const oauthSignature = require('oauth-signature');

// helpers
const generateRandomString = require('../helpers/generateRandomString');
const constructOAuthUrl = require('../helpers/constructOAuthUrl');
const constructAuthorizationHeader = require('../helpers/constructAuthorizationHeader');


exports.getPhotos = function(req, res) {
  const getPhotosUrl = `${CONSTANTS.ROOT_URL}${CONSTANTS.CONSUMER_KEY_SETTING}${CONSTANTS.GET_PHOTOS_URL_SETTINGS}`;

  return request(getPhotosUrl, function(error, response, body) {
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
}


exports.likePhoto = function(req, res) {
  const photoId = req.params.id;
  const oauthToken = res.req.body.oauth_token;
  const baseUrl = `${CONSTANTS.ROOT_URL}/${photoId}${CONSTANTS.LIKE_PHOTO_URL_SETTINGS}`

  const params = {
    oauth_token: oauthToken,
    oauth_consumer_key: CONSTANTS.CONSUMER_KEY,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Date.now(),
    oauth_nonce: generateRandomString(),
    oauth_version: '1.0',
  };

  // generates oauth_signature
  // null field is optional token_secret
  const signature = oauthSignature.generate('POST', baseUrl, params, CONSTANTS.CONSUMER_SECRET);

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
  // Both result in a 401 error.
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
}
