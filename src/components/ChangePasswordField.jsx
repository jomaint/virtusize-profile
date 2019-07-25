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
            pwdStrength: null,
            error: null
        };
    }

    saveAndClose = () => {

        // Password cant be too short, enforce at least 8 char
        if (this.state.newPassword.length < 8) {
            this.setState({ error: "Enter new password that's at least 8 characters long" });


        // API calls to backend goes here -
        } else {

            // After successfully updated, show notification
            this.setState({ showSuccess: true });

            // close modal after 2 secs
            setTimeout(() => {
                this.setState({ showModal: false });
            }, 2000);
        }
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

        this.setState({
            newPassword,
            pwdStrength,
            error: null     // clear error till next validation
        });
    }

    toggleVisibility = () => {
        let newType = (this.state.type === 'password') ? 'text' : 'password';
        this.setState({ type: newType });
    }

    // tips from zxcvbn are in array, preprocess before returning
    getTips(arr=[]) {
        if (arr.length > 0) {
            return arr.join(' ');
        }
        return arr;
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
        const {
            showModal,
            showSuccess,
            newPassword,
            type,
            pwdStrength,
            error
        } = this.state;

        const isHidingVisibility = type === 'password';
        // determines whether the descriptive text is shown in red or muted grey
        const tipsTextClass = error ? 'text-danger' : 'text-muted';
        const msg = error || this.getTips(pwdStrength?.feedback?.suggestions);

        return (
            <Modal
                show={showModal}
                onHide={this.onCloseModal}
                aria-labelledby="ModalHeader">

                <Modal.Header closeButton>
                    <Modal.Title id='ModalHeader'>Password Change</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {
                        showSuccess ?
                        <div className="show-success">
                            <div className="text-success text-center">Updated password successfully</div>
                        </div>
                        :
                        <div className="change-password-modal margin-top-16">
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
                                msg &&
                                <small class={`form-text ${tipsTextClass}`}>
                                    { msg }
                                </small>
                            }

                            {/* Show encouragement if password strength is good, and if there's no validation error  */}
                            {
                                (pwdStrength?.score == 4 && !error) &&
                                <small class="form-text text-success">
                                    Good job! Password is sufficiently strong.
                                </small>
                            }

                            <button className='btn btn-primary margin-top-48' onClick={this.saveAndClose}>
                                Change Password
                            </button>
                        </div>
                    }

                </Modal.Body>
          </Modal>
        );
    }

    render() {

        return (
            <div>
                <button
                    type="button"
                    id="password-change-btn"
                    className="margin-top-16"
                    onClick={this.onShowModal}>
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
