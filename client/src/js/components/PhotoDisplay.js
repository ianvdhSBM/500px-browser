import React, { PropTypes } from 'react';

// Components
import ReactSpinner from 'react-spinjs';
import PhotoDisplayItem from './PhotoDisplayItem';

// Redux
import { connect } from 'react-redux';
import {
  getPhotos,
  likePhoto,
} from '../actions';
// import sampleData from '../sampleData';

class PhotoDisplay extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    photosData: PropTypes.object,
    getPhotos: PropTypes.func.isRequired,
    likePhoto: PropTypes.func.isRequired,
  }
  state = {
    showAuthWarning: false,
  }
  componentDidMount = () => {
    this.props.getPhotos();
  };

  handleLikePhotoRequest = (photoId) => {
    // If user is not authenticated, update state to show a warning
    if (!this.props.authenticated) {
      return this.setState({
        showAuthWarning: true,
      });
    }

    // Since user is authenticated, lets set a like request!
    const { token } = this.props.token;
    this.props.likePhoto(photoId, token);
  }



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

    return <div>
      <div className="row">
        <div className="column medium-2 large-2 medium-offset-10 large-offset-10 reload-button">
          <a onClick={this.props.getPhotos} className="button">Reload Photos</a>
        </div>
      </div>
      <div className="row">
        {
          // sampleData.photos.map((photo, i) => {
          photosData.photos.map((photo, i) => {
            if (photo.nsfw) return;
            return <PhotoDisplayItem key={i} photo={photo} handleLikePhotoRequest={this.handleLikePhotoRequest}/>;
          })
        }
      </div>
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    photosData: state.PhotosReducer.photosData,
    authenticated: state.UserReducer.authenticated,
    token: state.UserReducer.token,
  };
};



export default connect(mapStateToProps,
  {
    getPhotos,
    likePhoto,
  }
)(PhotoDisplay);
