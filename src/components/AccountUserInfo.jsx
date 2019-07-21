import React from 'react';
import PropTypes from 'prop-types';
import UserProfile from './UserProfile';
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

    onNameFieldChange = (valueObj) => {
        this.setState({ ...valueObj });
    }

    render() {
        const { firstName, lastName, email } = this.state;
        const fullName = `${firstName} ${lastName}`;

        return (
            <div id="account-profile">
                <h3 className="page-header">Profile</h3>

                <div className="flex-row margin-top-72 margin-bottom-72">
                    <UserProfile />
                    <div className="margin-left-48 flex-col justify-content-center">
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
                    onChange={this.onNameFieldChange} />

                {/* Basic editable text field component */}
                <EditableTextField
                    label="EMAIL"
                    value={email}
                    type="email"
                    placeholder="Your email"
                    className="margin-top-24"
                    onChange={this.onChangeField('email')}
                    required />
            </div>
        );
    }
}
