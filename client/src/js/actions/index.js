import axios from 'axios';
import {
  GET_PHOTOS,
  IS_AUTHENTICATED,
} from './types';
import {
  SERVER_BASE_URL,
} from '../constants';

export const getPhotos = () => {
  return function(dispatch) {
    return axios.get(`${SERVER_BASE_URL}/photos`)
      .then(response => {
        dispatch({
          type: GET_PHOTOS,
          payload: response.data,
        });
      });
  };
};

// data is an object of { token<token, expires>>, authenticated<bool> }
export const updateAuthenticatedStatus = (data) => {
  return function(dispatch) {
    dispatch({
      type: IS_AUTHENTICATED,
      payload: data,
    });
  };
};

export const likePhoto = (photoId, token) => {

  return function(dispatch) {
    return axios.post(`${SERVER_BASE_URL}/photos/${photoId}/vote`, {
      oauth_token: token,
    }).then(response => {
      console.log('RESPONSE', response);
    }).catch(error => {
      console.log('ERROR', error);
    });
  };
};
