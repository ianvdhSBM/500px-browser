import React, { PropTypes } from 'react';

// Components
import InfoButton from './InfoButton';
import LikeButton from './LikeButton';
import PhotoInfoView from './PhotoInfoView';

export default class PhotoDisplayItem extends React.Component {
  static propTypes = {
    photo: PropTypes.object.isRequired,
    handleLikePhotoRequest: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
  }
  state = {
    showPhotoInfo: false,
  }

  handleShowInfo = () => {
    this.setState({
      showPhotoInfo: !this.state.showPhotoInfo,
    });
  }

  render() {
    const {
      props: {
        authenticated,
        handleLikePhotoRequest,
        photo,
      },
      state: {
        showPhotoInfo,
      },
    } = this;

    return <div className="column small-12 medium-6 large-4 photo-frame">
      <InfoButton handleShowInfo={this.handleShowInfo} authenticated={authenticated} />
      <LikeButton handleLikePhotoRequest={handleLikePhotoRequest} photoId={photo.id} />
      <img src={photo.image_url} width={photo.width} />
      <PhotoInfoView
        photo={photo}
        showPhotoInfo={showPhotoInfo}
      />
    </div>;
  }
}
