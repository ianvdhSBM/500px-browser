import {
  IS_AUTHENTICATED,
} from '../actions/types';

const INITIAL_STATE = { authenticated: false };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case IS_AUTHENTICATED:
    return {
      ...state,
      authenticated: action.payload.authenticated,
      token: action.payload.token,
    };
  default:
    return state;
  }
}
