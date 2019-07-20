import React from 'react';
import PropTypes from 'prop-types';
import EditableTextField from './EditableTextField';
import EditableNameField from './EditableNameField';

export default class AccountUserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: 'emily',
            lastName: 'lee',
            email: 'emily_lee@gmail.com'
        };
    }

    onChangeField = (label) => (value) => {
        this.setState({ [label]: value });
    }

    render() {
        const { firstName, lastName, email } = this.state;
        const fullName = `${firstName} ${lastName}`;

        return (
            <div id="account-profile">
                <h3 className="page-header">Profile</h3>

                <div className="flex-row margin-top-48 margin-bottom-48">
                    <div className="account-profile-pic">
                    </div>
                    <div className="margin-left-48 justify-content-center">
                        <h4 id="account-profile-name-preview" >
                            {fullName}
                        </h4>
                        <p id="account-profile-email-preview">
                            {email}
                        </p>
                    </div>
                </div>

                {/* Component to edit full name as two fields */}
                <EditableNameField
                    firstName={firstName}
                    lastName={lastName}
                    onChange={this.onChangeField} />

                {/* Basic editable text field component */}
                <EditableTextField
                    label="EMAIL"
                    value={email}
                    type="email"
                    placeholder="Your email"
                    className="margin-top-24"
                    onChange={this.onChangeField('email')} />
            </div>
        );
    }
}
