import React from 'react';
import { hot } from 'react-hot-loader';
import AccountPanel from './components/AccountPanel';
import Navbar from './components/Navbar';

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div id="account-page" className="container-fluid flex-center-all">
                    <AccountPanel />
                </div>
            </div>
        );
    }
}

export default hot(module)(App);
