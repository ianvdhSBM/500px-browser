import axios from 'axios';
import {
  GET_PHOTOS,
  IS_AUTHENTICATED,
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

// data is an object of { token<token, expires>>, authenticated<bool> } 
export const updateAuthenticatedStatus = (data) => {
  return function(dispatch) {
    dispatch({
      type: IS_AUTHENTICATED,
      payload: data,
    });
  };
};
