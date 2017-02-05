import React, { PropTypes } from 'react';
import sampleData from '../sampleData';

// Components
import ReactSpinner from 'react-spinjs';
import PhotoDisplayItem from './PhotoDisplayItem';

// Redux
import { connect } from 'react-redux';
import { getPhotos } from '../actions';


class PhotoDisplay extends React.Component {
  static PropTypes = {
    photosData: PropTypes.object.isRequired,
  }
  componentDidMount = () => {
    this.props.getPhotos();
  };

  render() {
    const {
      props: {
        photosData,
      },
    } = this;

    if (!photosData) {
      // if the data is still loading, show a loading spinner
      return <ReactSpinner />;
    }

    return <div className="row">
      {
        photosData.photos.map((photo, i) => {
          return <PhotoDisplayItem key={i} photo={photo} />;
        })
      }
    </div>;
  }
}

const mapStateToProps = (state) => {

  return {
    photosData: state.PhotosReducer.photosData,
  };
};

export default connect(mapStateToProps, { getPhotos })(PhotoDisplay);
