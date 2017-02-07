import axios from 'axios';
import {
  GET_PHOTOS,
} from './types';
import CONSTANTS from '../constants';

export const getPhotos = () => {
  return function(dispatch) {
    return axios.get(`${CONSTANTS.SERVER_BASE_URL}/photos`)
      .then(response => {
        dispatch({
          type: GET_PHOTOS,
          payload: response.data,
        });
      });
  };
};

export const request500pxLogin = () => {
  return function(dispatch) {
    return axios.get(`${CONSTANTS.SERVER_BASE_URL}/login/500px`)
    .then(response => {
      console.log('RESPONSE', response.request.responseURL);
      window.location.href = response.request.responseURL;
    }).catch(err => {
      console.log(err);
    });
  };
};
