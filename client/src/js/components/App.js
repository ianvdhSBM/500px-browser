import React, { PropTypes } from 'react';
import {
  TWO_DAYS_IN_MILLISECONDS,
  OAUTH_TOKEN,
} from '../constants';

// Components
import LoginHeader from './LoginHeader';

// Redux
import { connect } from 'react-redux';
import { updateAuthenticatedStatus } from '../actions';

class App extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.object,
    updateAuthenticatedStatus: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    // check if there is a token in the query
    if (this.props.location.query.oauth_token) {
      const expirationDate = Date.now() + TWO_DAYS_IN_MILLISECONDS;
      const tokenWithExpiration = {
        token: this.props.location.query.oauth_token,
        expires: expirationDate,
      };

      // this may overwrite an existing token, but that's okay b/c this one will be newer
      localStorage.setItem(OAUTH_TOKEN, JSON.stringify(tokenWithExpiration));

      // Save into state and return to skip section after this call
      return this.props.updateAuthenticatedStatus({
        token: tokenWithExpiration,
        authenticated: true,
      });
    }

    // Lastly, if no query set, check
    const token = JSON.parse(localStorage.getItem(OAUTH_TOKEN));
    if (token) {
      if (token.expires > Date.now()) {
        this.props.updateAuthenticatedStatus({
          token: token,
          authenticated: true,
        });
      }
    }
  }

  render() {
    return <div>
      <LoginHeader/>
      {this.props.children}
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.UserReducer.authenticated,
  };
};

export default connect(mapStateToProps, { updateAuthenticatedStatus })(App);
