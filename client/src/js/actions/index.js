import axios from 'axios';
import {
  APP_ERROR,
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
        if (response.data.error) {
          // handle error

          return dispatch({
            type: APP_ERROR,
            payload: response.data,
          });
        }

        return dispatch({
          type: GET_PHOTOS,
          payload: response.data,
        });
      }).catch(err => {
        return dispatch({
          type: APP_ERROR,
          payload: err,
        });
      });
  };
};

// data object sample
// {
//   token: {
//     token: String,
//     expires: Timestamp,
//   },
//   authenticated: bool,
// }
export const updateAuthenticatedStatus = (data) => {
  return function(dispatch) {
    dispatch({
      type: IS_AUTHENTICATED,
      payload: data,
    });
  };
};

// photoId - String
// token - String
// Currently not working... :(
export const likePhoto = (photoId, token) => {

  return function(dispatch) {
    return axios.post(`${SERVER_BASE_URL}/photos/${photoId}/vote`, {
      oauth_token: token,
    }).then(response => {
      if (response.data.statusCode === 401) {
        dispatch({
          type: APP_ERROR,
          payload: {
            error: 'Unauthorized',
            status: 401,
          },
        });
      }

      if (response.data.statusCode === 500) {
        dispatch({
          type: APP_ERROR,
          payload: {
            error: 'Internal Server Error',
            status: 500,
          },
        });
      }

      // When this route is working, add call to store photo id in an array in PhotoReducer.
      // Then check against it when rednering photos to make the heart appear red

    }).catch(error => {
      dispatch({
        type: APP_ERROR,
        payload: error,
      });
    });
  };
};


export const updateErrorStatus = (data) => {
  return function(dispatch) {
    dispatch({
      type: APP_ERROR,
      payload: data,
    });
  };
};
