import axios from 'axios';
import {
  GET_PHOTOS,
} from './types';

import sampleData from '../sampleData';

export const getPhotos = () => {

  return {
    type: GET_PHOTOS,
    payload: sampleData,
  };
};
