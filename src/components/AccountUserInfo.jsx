import React from 'react';
import PropTypes from 'prop-types';
import UserProfile from './UserProfile';
import EditableTextField from './EditableTextField';
import EditableNameField from './EditableNameField';
import ChangePasswordField from './ChangePasswordField';

export default class AccountUserInfo extends React.Component {
    constructor(props) {
        super(props);

        // Store all except password (shouldn't store on client side)
        this.state = {
            firstName: 'emily',
            lastName: 'lee',
            email: 'emily_lee@gmail.com'
        };
    }

    onChangeField = label => value => {
        console.log('account user info on change', label, value);
        this.setState({ [label]: value });
    }

    onNameFieldChange = valueObj => {
        this.setState({ ...valueObj });
    }

    render() {
        const { firstName, lastName, email } = this.state;
        const fullName = `${firstName} ${lastName}`;

        return (
            <div id="account-profile">
                <h3 className="page-header">Profile</h3>

                <div className="flex-row margin-top-72 margin-bottom-72">
                    <UserProfile email={email} />
                    <div className="margin-left-36 flex-col justify-content-center">
                        <h5 id="account-profile-name-preview" >
                            {fullName}
                        </h5>
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

                <hr/>

                <ChangePasswordField />
            </div>
        );
    }
}
