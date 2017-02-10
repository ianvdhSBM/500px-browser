module.exports = function constructOAuthUrl(baseUrl, params) {
  let url = baseUrl;

  for (key in params) {
    url += `&${key}=${params[key]}`
  }

  return url;
}

// Sample constructed OAuth URL
// https://api.500px.com/v1/photos/vote?vote=1
// &oauth_token=oauth_token
// &oauth_consumer_key=oauth_consumer_key
// &oauth_version=oauth_version
// &oauth_signature_method=oauth_signature_method
// &oauth_timestamp=oauth_timestamp
// &oauth_nonce=oauth_nonce
// &oauth_signature=signature
