import React, { PropTypes } from 'react';

export default class PhotoInfoView extends React.Component {
  static propTypes = {
    photo: PropTypes.object.isRequired,
    showPhotoInfo: PropTypes.bool.isRequired,
  }

  render() {
    const {
      props: {
        photo,
        showPhotoInfo,
      },
    } = this;

    const opacity = showPhotoInfo ? { opacity: 0.8 } : { opacity: 0 };

    return <div className="photo-info-view" style={opacity}>
      <li>
        <strong>Title: </strong> {photo.name ? photo.name : <i>No info available</i> }
      </li>
      <li>
        <strong>Camera: </strong> {photo.camera ? photo.camera : <i>No info available</i> }
      </li>
      <li>
        <strong>Aperture: </strong> {photo.aperture ? photo.aperture : <i>No info available</i> }
      </li>
      <li>
        <strong>Shutter Speed: </strong> {photo.shutter_speed ? photo.shutter_speed : <i>No info available</i> }
      </li>
      <li>
        <strong>ISO: </strong> {photo.iso ? photo.iso : <i>No info available</i> }
      </li>
    </div>;
  }
}
