import React, { PropTypes } from 'react';

// Components
import ReactSpinner from 'react-spinjs';
import PhotoDisplayItem from './PhotoDisplayItem';
import {
  UnstyledFlexDialog,
  ModalContainer,
} from 'react-modal-dialog';

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
    error: PropTypes.object,
    getPhotos: PropTypes.func.isRequired,
    likePhoto: PropTypes.func.isRequired,
    photosData: PropTypes.object,
    token: PropTypes.object,
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

    // Since user is authenticated, lets send a like request!
    const { token } = this.props.token;
    this.props.likePhoto(photoId, token);
  }

  handleCloseErrorWindow = () => {
    this.setState({
      showAuthWarning: false,
    });
  }


  render() {
    const {
      props: {
        error,
        photosData,
        authenticated,
      },
      state: {
        showAuthWarning,
      },
    } = this;

    // if there's an error, and no photos, don't show anything.
    // Keeps the react-spinner below from hovering over the error window.
    if (error && !photosData) {
      return null;
    }

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
            return <PhotoDisplayItem
              key={i}
              authenticated={authenticated}
              handleLikePhotoRequest={this.handleLikePhotoRequest}
              photo={photo}
            />;
          })
        }
      </div>

      {
        showAuthWarning &&
        <ModalContainer onClose={this.handleCloseErrorWindow}>
          <UnstyledFlexDialog onClose={this.handleCloseErrorWindow}>
            <div className="error-window">
              <div className="error-header">
                <h4>Whoa there.</h4>
              </div>
              <div className="error-body">
                <p>It looks like you're not logged in, ya little rascal!</p>
                <p>Log in. Then, you can like some photos.</p>
              </div>
            </div>
          </UnstyledFlexDialog>
        </ModalContainer>
      }
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    photosData: state.PhotosReducer.photosData,
    authenticated: state.UserReducer.authenticated,
    token: state.UserReducer.token,
    error: state.ErrorReducer.error,
  };
};



export default connect(mapStateToProps,
  {
    getPhotos,
    likePhoto,
  }
)(PhotoDisplay);
