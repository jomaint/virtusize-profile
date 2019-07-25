import React from 'react';
import { hot } from 'react-hot-loader';
import AccountPanel from './components/AccountPanel';
import Navbar from './components/Navbar';
import Vvector from './components/Vvector';

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div id="account-page" className="container-fluid flex-center-all">
                    <AccountPanel />

                     {/* Accent background with brand V*/}
                    <div className="brand-v-background">
                        <Vvector />
                    </div>
                </div>
            </div>
        );
    }
}

export default hot(module)(App);
