import React from 'react';

// Redux
// import { connect } from 'react-redux';

class LoginHeader extends React.Component {

  request500pxLogin = () => {
    window.location = 'http://localhost:3000/login/500px/';
  }

  render() {
  //   const {
  //     props: {
  //
  //     },
  //   } = this;

    return <div className="header">
      <div className="row">
        <div className="column medium-offset-10 medium-2 large-2">
          <a onClick={this.request500pxLogin} className="button success">Login with 500px</a>
        </div>
      </div>
    </div>;
  }
}

export default LoginHeader;
