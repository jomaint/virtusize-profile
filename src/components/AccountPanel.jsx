import React from 'react';
import PropTypes from 'prop-types';
import AccountUserInfo from './AccountUserInfo';

const menu = [
    {
        label: 'Profile',
        iconClass: 'fa-user'
    },
    {
        label: 'Settings',
        iconClass: 'fa-sun'
    },
    {
        label: 'Notifications',
        iconClass: 'fa-bell'
    },
    {
        label: 'Help',
        iconClass: 'fa-question-circle'
    },
    {
        label: 'Feedback',
        iconClass: 'fa-comment-dots'
    },
];

export default class AccountPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'Profile'
        };
    }

    onMenuPress = (label) => () => {
        console.log('label', label);
        this.setState({ current: label });
    }

    // Render a dummy menu
    renderMenu() {
        const { current } = this.state;

        return (
            <div className="col-12 col-sm-4 col-md-3 flex-col side-panel">
                <div className="row">
                    <ul id="account-menu">
                        {
                            menu.map((item,ind) => (
                                <li key={`menu-item-${ind}`} className='menu-item flex-row'>
                                    <button onClick={this.onMenuPress(item.label)} style={ current === item.label ? styles.activeMenuItem : {} }>
                                        <i className={`far ${item.iconClass}`}></i>
                                        <span>{item.label}</span>
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }

    render() {
        const { current } = this.state;

        return (
            <div id="account-panel" >
                <div className="flex">
                    { this.renderMenu() }
                    <div className="col-12 col-sm-8 col-md-9">

                        { current === 'Profile' && <AccountUserInfo /> }
                        { current !== 'Profile' && <div /> }
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    activeMenuItem: {
        fontWeight: 600,
        color: '#0E1C3B'
    }
}
