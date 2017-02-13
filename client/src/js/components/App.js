import React, { PropTypes } from 'react';
import {
  TWO_DAYS_IN_MILLISECONDS,
  OAUTH_TOKEN,
} from '../constants';

// Components
import LoginHeader from './LoginHeader';
import {
  UnstyledFlexDialog,
  ModalContainer,
} from 'react-modal-dialog';

// Redux
import { connect } from 'react-redux';
import {
  updateAuthenticatedStatus,
  updateErrorStatus,
} from '../actions';

class App extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool,
    children: PropTypes.node.isRequired,
    error: PropTypes.object,
    location: PropTypes.object,
    updateAuthenticatedStatus: PropTypes.func.isRequired,
    updateErrorStatus: PropTypes.func.isRequired,
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

    // Lastly, if no query set, check localStorage
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

  handleLogout = () => {
    localStorage.removeItem(OAUTH_TOKEN);
    this.props.updateAuthenticatedStatus({
      token: null,
      authenticated: false,
    });
  }

  buildErrorNodes = (error) => {
    const array = [];
    Object.keys(error).map(key => {
      return array.push(<li key={key} className="error-list"><strong>{key}</strong> - {error[key]}</li>);
    });

    return array;
  }

  handleCloseErrorWindow = () => {
    this.props.updateErrorStatus(null);
  }

  render() {
    const {
      props: {
        authenticated,
        error,
      },
    } = this;

    // if there are errors, let's make them list items, so they display nicely
    const errorNodes = error && this.buildErrorNodes(error);

    return <div>
      <LoginHeader authenticated={authenticated} handleLogout={this.handleLogout}/>
      {this.props.children}

      {
        error &&
        <ModalContainer onClose={this.handleCloseErrorWindow}>
          <UnstyledFlexDialog onClose={this.handleCloseErrorWindow}>
            <div className="error-window">
              <div className="error-header">
                <h4>Well, this is embarrassing.</h4>
              </div>
              <div className="error-body">
                <p>It looks like we've encountered an error.</p>
                <p>Here is some info on what happened.</p>
                <ul>
                  {errorNodes}
                </ul>
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
    authenticated: state.UserReducer.authenticated,
    error: state.ErrorReducer.error,
  };
};

export default connect(mapStateToProps,
  {
    updateAuthenticatedStatus,
    updateErrorStatus,
  }
)(App);
