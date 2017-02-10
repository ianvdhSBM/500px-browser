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

    return <div className="login-header">
      <div className="row">
        <div className="column small-7 large-9 medium-8 header-title">
          <h3>500px browser</h3>
        </div>
        <div className="column small-5 large-3 medium-4 login-buttons">
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
