import React, { PropTypes } from 'react';

export default class LikeButton extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool,
    handleLikePhotoRequest: PropTypes.func.isRequired,
    photoId: PropTypes.number.isRequired,
  }
  state = {
    liked: false,
  }
  handleLike = () => {
    // User can't dislike a photo or like a photo twice. If they already
    // liked it, return.
    if (this.state.liked) return;

    // If user is not authenticated, don't change state and update
    // the color of the button
    if (this.props.authenticated) {
      this.setState({
        liked: true,
      });
    }

    this.props.handleLikePhotoRequest(this.props.photoId);
  }

  render() {
    const {
      state: {
        liked,
      },
    } = this;

    // If user likes a photo, change the fill colour to a darker colour
    const svgClassName = liked ? 'svg-like-button svg-like-highlight' : 'svg-like-button';


    return <div className="like-button">
      <svg onClick={this.handleLike} className={svgClassName} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/>
      </svg>
    </div>;
  }
}
