import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap-modal';
import zxcvbn from 'zxcvbn';

class ChangePasswordField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            newPassword: '',
            type: 'password', // toggles between 'password' & 'text' for visibility
            pwdStrength: null
        };
    }

    saveAndClose = () => {
        console.log('saving form ');
        // API calls to backend goes here -
    }

    onCloseModal = () => {
        this.setState({ showModal: false });
    }

    onShowModal = () => {
        this.setState({ showModal: true });
    }

    onChangeNewPassword = e => {
        let newPassword = e.target.value;
        let pwdStrength = zxcvbn(newPassword);

        this.setState({ newPassword, pwdStrength });
    }

    toggleVisibility = () => {
        let newType = (this.state.type === 'password') ? 'text' : 'password';
        this.setState({ type: newType });
    }

    renderStrengthDisplay() {
        const { pwdStrength }= this.state;
        const score = pwdStrength?.score || 0;
        const valueToDisplay =  score * 25;

        let colorClass = 'bg-danger';
        if (score == 3)
            colorClass = 'bg-info';
        if (score == 4)
            colorClass = 'bg-success';

        return (
            <React.Fragment>
                <p className="pwd-strength-label">Password strength</p>
                <div className="progress">
                    <div
                        className={`progress-bar ${colorClass}`}
                        role="progressbar"
                        style={{ width: `${valueToDisplay}%` }}
                        aria-valuenow={`${valueToDisplay}%`}
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                </div>
            </React.Fragment>
        );
    }

    renderModal() {
        const { showModal, newPassword, type, pwdStrength } = this.state;
        console.log('modal render', showModal);

        const isHidingVisibility = type === 'password';

        return (
            <Modal
                show={showModal}
                onHide={this.onCloseModal}
                aria-labelledby="ModalHeader">

                <Modal.Header closeButton>
                    <Modal.Title id='ModalHeader'>Password Change</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="change-password-modal margin-top-16 margin-bottom-24">
                        <div class="form-group">
                            <label for="password">New password</label>
                            <input
                                name="password"
                                value={newPassword}
                                onChange={this.onChangeNewPassword}
                                type={type}>
                            </input>

                            {/* Eye icon button to toggle password visibility */}
                            <div className="password-visibility-btn" onClick={this.toggleVisibility}>
                                {
                                    isHidingVisibility ?
                                    <i class="far fa-eye-slash"></i> :
                                    <i class="far fa-eye"></i>
                                }
                            </div>
                        </div>

                         { this.renderStrengthDisplay() }

                        {/* Show Message to assist user to create a stronger password */}
                        {
                            pwdStrength?.feedback?.suggestions &&
                            <small class="form-text text-muted">
                                { pwdStrength.feedback.suggestions }
                            </small>
                        }

                        {/* Show encouragement if password strength is good */}
                        {
                            (pwdStrength?.score == 4) &&
                            <small class="form-text text-success">
                                Good job! Password is sufficiently strong.
                            </small>
                        }
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>

                    <button className='btn btn-primary' onClick={this.saveAndClose}>
                        Save
                    </button>
              </Modal.Footer>
          </Modal>
        );
    }

    render() {

        return (
            <div>
                <button type="button" onClick={this.onShowModal}>
                    Password Change
                </button>

                { this.renderModal() }
            </div>
        );
    }
}

ChangePasswordField.propTypes = {

};

ChangePasswordField.defaultProps = {

};

export default ChangePasswordField;
