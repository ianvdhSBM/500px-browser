import { combineReducers } from 'redux';
import PhotosReducer from './PhotosReducer';
import UserReducer from './UserReducer';
import ErrorReducer from './ErrorReducer';

const rootReducer = combineReducers({
  ErrorReducer,
  PhotosReducer,
  UserReducer,
});

export default rootReducer;
