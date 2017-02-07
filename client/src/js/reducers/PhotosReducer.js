import {
  GET_PHOTOS,
} from '../actions/types';

const INITIAL_STATE = { photosData: null };

export default function(state = INITIAL_STATE, action) {

  switch (action.type) {
  case GET_PHOTOS:
    return {
      ...state,
      photosData: action.payload,
    };
  default:
    return state;
  }
}
