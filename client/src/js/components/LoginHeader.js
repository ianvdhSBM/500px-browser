import React from 'react';

// Redux
import { connect } from 'react-redux';
import { request500pxLogin } from '../actions';

class LoginHeader extends React.Component {

  requestLogin = () => {
    this.props.request500pxLogin();
  }

  render() {
  //   const {
  //     props: {
  //
  //     },
  //   } = this;

    return <div className="header">
      <div className="row">
        <div className="column small-12 medium-12 large-12">
          <a onClick={this.requestLogin} className="button success">Login with 500px</a>
        </div>
      </div>
    </div>;
  }
}

export default connect(null, { request500pxLogin })(LoginHeader);
