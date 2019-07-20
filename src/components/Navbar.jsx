import React from 'react';
import PropTypes from 'prop-types';
import brandImg from '../../static/images/logo.png';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <nav className="navbar navbar-light">
                <a className="navbar-brand" href="#">
                    <img src={brandImg} width="30" height="30" alt="virtusize-logo" />
                </a>
            </nav>
        );
    }
}
