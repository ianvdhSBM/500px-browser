const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;

const CALLBACK_URL = 'http://localhost:3000/login/500px/callback/';
const CLIENT_URL = 'http://localhost:8080';
const CONSUMER_KEY_SETTING = `?consumer_key=${CONSUMER_KEY}&`;
const GET_PHOTOS_URL_SETTINGS = 'feature=popular&sort=created_at&image_size=3&include_store=store_download&include_states=voted&rpp=100';
const LIKE_PHOTO_URL_SETTINGS = '/vote?vote=1';
const ROOT_URL = 'https://api.500px.com/v1/photos';


module.exports = {
  CALLBACK_URL,
  CLIENT_URL,
  CONSUMER_KEY,
  CONSUMER_KEY_SETTING,
  CONSUMER_SECRET,
  GET_PHOTOS_URL_SETTINGS,
  LIKE_PHOTO_URL_SETTINGS,
  ROOT_URL,
};
