import React, { PropTypes } from 'react';

// Components
import {
  UnstyledFlexDialog,
  ModalContainer,
} from 'react-modal-dialog';


export default class AuthenticationWarningModal extends React.Component {
  static propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
  }
  render() {
    const {
      props: {
        handleCloseModal,
      },
    } = this;

    return <ModalContainer onClose={handleCloseModal}>
      <UnstyledFlexDialog onClose={handleCloseModal}>
        <div className="error-window">
          <div className="error-header">
            <h4>Whoa there.</h4>
          </div>
          <div className="error-body">
            <p>It looks like you're not logged in.</p>
            <p>Log in. Then, you can like some photos.</p>
          </div>
        </div>
      </UnstyledFlexDialog>
    </ModalContainer>;
  };
}
