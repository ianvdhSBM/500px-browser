import React, { PropTypes } from 'react';
import sampleData from '../sampleData';

// Components
import ReactSpinner from 'react-spinjs';
import PhotoDisplayItem from './PhotoDisplayItem';

export default class PhotoDisplay extends React.Component {
  render() {
    // const {
    //   props: {
    //
    //   },
    // } = this;


    return <div className="row">
      {
        sampleData.photos.map((photo, i) => {
          return <PhotoDisplayItem key={i} photo={photo} />;
        })
      }
    </div>;
  }
}
