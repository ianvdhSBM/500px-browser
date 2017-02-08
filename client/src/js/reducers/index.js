import { combineReducers } from 'redux';
import PhotosReducer from './PhotosReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
  PhotosReducer,
  UserReducer,
});

export default rootReducer;
