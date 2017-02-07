import React, { PropTypes } from 'react';

// Components
import ReactSpinner from 'react-spinjs';
import PhotoDisplayItem from './PhotoDisplayItem';

// Redux
import { connect } from 'react-redux';
import { getPhotos } from '../actions';


class PhotoDisplay extends React.Component {
  static PropTypes = {
    photosData: PropTypes.object.isRequired,
    getPhotos: PropTypes.func.isRequired,
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

    // if data is still being fetched, show a loading spinner
    if (!photosData) {
      return <ReactSpinner />;
    }

    return <div className="row">
      {
        photosData.photos.map((photo, i) => {
          if (photo.nsfw) return;
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
