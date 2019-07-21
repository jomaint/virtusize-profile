import React from 'react';
import PropTypes from 'prop-types';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        }
    }
}

UserProfile.propTypes = {
    email: PropTypes.string
};
UserProfile.defaultProps = {
};

export default UserProfile;
