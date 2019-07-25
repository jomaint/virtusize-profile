import React from 'react';
import PropTypes from 'prop-types';
import md5 from "blueimp-md5";

class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hover: false
        }
    }

    onMouseEnter = () => {
        this.setState({ hover: true });
    }

    onMouseLeave = () => {
        this.setState({ hover: false });
    }

    onChange = e => {
        console.log('onChange userprofile', e.target.files[0]);
        // Suppose to upload to S3 or backend, but we are gonna use it to set local state directly to see changes
        let that = this;
        const fileObj = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(loadedEvent) {
            that.setState({ file: loadedEvent.target.result });
        }

        reader.readAsDataURL(fileObj);
    }


    render() {
        const { hover, file } = this.state;
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

            // if there's a local file uploaded, show
            const imgSrc = (file) ? file : `https://www.gravatar.com/avatar/${str}?s=200`;

            return (
                <div
                    className="account-profile-pic-wrapper"
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}>
                    <div className="account-profile-pic">
                        <img src={imgSrc} />
                    </div>
                    {
                        <div
                            className="editable-icon-container"
                            style={{ opacity: hover ? 1 : 0 }}>
                            <input type="file" onChange={this.onChange} />
                            <i class="fas fa-pencil-alt"></i>
                        </div>
                    }
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
