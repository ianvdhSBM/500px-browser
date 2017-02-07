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
    window.location = 'http://localhost:3000/login/500px/';
    // return axios.get(`${CONSTANTS.SERVER_BASE_URL}/login/500px`)
    // .then(response => {
    //   console.log('RESPONSE', response.request.responseURL);
    //   window.open(response.request.responseURL, '', 'top=100,left=100,width=800,height=800');
    // }).catch(err => {
    //   console.log(err);
    // });
  };
};
