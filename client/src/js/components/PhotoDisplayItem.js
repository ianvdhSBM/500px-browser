import React, { PropTypes } from 'react';

export default class PhotoDisplayItem extends React.Component {
  static propTypes = {
    photo: PropTypes.object.isRequired,
  }
  render() {
    const {
      props: {
        photo,
      },
    } = this;

    return <div className="column small-12 medium-6 large-4 photo-frame">
          <img src={photo.image_url} width={photo.width} />
    </div>;
  }
}
