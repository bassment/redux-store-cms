import shared from 'styles/shared.scss';
import styles from './Login.scss';

import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';

export default class Login extends React.Component {
    render() {
        const {user, error, onSignIn, onGoogleSignIn, onSignUp, onSignOut} = this.props;
        let username;
        let password;

        // VIEWS

        const viewLogout = (() => {
            return (
                <div>
                    <section className={shared['section']}>
                        <p>Hi {user}!</p>
                        <div>
                            <button className={styles['button']} onClick={onSignOut}>Sign Out</button>
                        </div>
                    </section>
                </div>
            );
        })();

        const viewLogin = (() => {
            return (
                <div>
                    <Helmet title="Login"/>
                    <section className={shared['section']}>
                        <form>
                            <input className={styles['input']}
                                type="text" placeholder="Username" ref={node => { username = node; }}/>
                            <input className={styles['input']}
                                type="password" placeholder="Password" ref={node => { password = node; }}/>
                        </form>
                        {error ? <span className={styles['message-error']}> {error} </span> : null }
                        <div className={styles['login-area']}>
                            <button className={styles['button']}
                                onClick={() => onSignIn(username.value, password.value)}>
                                Sign In
                            </button>
                            <button className={styles['button']}
                                onClick={() => onSignUp(username.value, password.value)}>
                                Sign Up
                            </button>
                        </div>
                        <button className={styles['button-google']}
                            onClick={onGoogleSignIn}>Login with Google</button>
                    </section>
                </div>
            );
        })();

        // RENDER VIEW

        return user ? viewLogout : viewLogin;
    }
}
