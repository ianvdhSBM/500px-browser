import React, { PropTypes } from 'react';
import { OAUTH_URL_500PX } from '../constants';

// Redux
// import { connect } from 'react-redux';

class LoginHeader extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    handleLogout: PropTypes.func.isRequired,
  }
  request500pxLogin = () => {
    window.location = OAUTH_URL_500PX;
  }

  render() {
    const {
      props: {
        authenticated,
        handleLogout,
      },
    } = this;

    return <div className="header">
      <div className="row">
        <div className="column medium-offset-10 medium-3 large-3">
          {
            !authenticated &&
            <a onClick={this.request500pxLogin} className="button success">Login with 500px</a>
          }
          {
            authenticated &&
            <a onClick={handleLogout} className="button alert">Logout</a>
          }
        </div>
      </div>
    </div>;
  }
}

export default LoginHeader;
