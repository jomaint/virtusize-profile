import React from 'react';
import PropTypes from 'prop-types';
import md5 from "blueimp-md5";

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { email } = this.props;


        // No email provided to display
        if (!email) {
            return (
                <div className="account-profile-pic flex-center-all">
                    <i className="far fa-user"></i>
                </div>
            );

        } else {
            // To use gravatar
            // Trim leading and trailing whitespace from an email address
            let str = email.trim();
            // Force all characters to lower-case
            str = str.toLowerCase();
            // md5 hash the final string
            str = md5(str);

            console.log('Final str after process', str);

            return (
                <div className="account-profile-pic">
                    <img src={`https://www.gravatar.com/avatar/${str}?s=200`} />
                </div>
            );
        }
    }
}

UserProfile.propTypes = {
    email: PropTypes.string
};
UserProfile.defaultProps = {
};

export default UserProfile;
