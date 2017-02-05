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
