import React, { PropTypes } from 'react';

// Components
import InfoButton from './InfoButton';
import LikeButton from './LikeButton';
import PhotoInfoView from './PhotoInfoView';

export default class PhotoDisplayItem extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool,
    handleLikePhotoRequest: PropTypes.func.isRequired,
    photo: PropTypes.object.isRequired,
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
      <InfoButton handleShowInfo={this.handleShowInfo} />
      <LikeButton
        handleLikePhotoRequest={handleLikePhotoRequest}
        photoId={photo.id}
        authenticated={authenticated}
      />
      <img src={photo.image_url} width={photo.width} height={photo.height} />
      <PhotoInfoView
        photo={photo}
        showPhotoInfo={showPhotoInfo}
      />
    </div>;
  }
}
