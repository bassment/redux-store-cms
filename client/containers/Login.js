import Firebase from 'firebase';
import * as API from 'helpers/restAPI';

import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

import Login from 'components/Login/login';
import {signin, signout} from 'actions/login';
import {reset} from 'actions/counter';

const config = {
    apiKey: "AIzaSyCggQWwXBEBoOxdxZSKtttdEXlxKr7DrwQ",
    authDomain: "dev-redux-f4d1b.firebaseapp.com",
    databaseURL: "https://dev-redux-f4d1b.firebaseio.com",
    storageBucket: "dev-redux-f4d1b.appspot.com",
    messagingSenderId: "1016976849868"
};

const mapStateToProps = (state) => {
    return {
        user: state.getIn(['login'])['user'],
        error: state.getIn(['login'])['error']
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSignIn: (username, password) => {
            API.signin(username, password).then(response => {
                if (response.signedIn) {
                    const user = response.user.username;
                    localStorage.setItem('user', user);
                    dispatch(signin(user));
                    browserHistory.push('/counter');
                } else {
                    const error = response.message;
                    dispatch(signin(null, error));
                }
            });
        },
        onGoogleSignIn: () => {
            const firebase = Firebase.initializeApp(config);
            const provider = new Firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');

            firebase.auth().signInWithPopup(provider)
            .then(user => {
                const googleUser = user.google.displayName;
                localStorage.setItem('user', googleUser);
                dispatch(signin(googleUser, null));
                browserHistory.push('/counter');
            })
            .catch(console.error);
        },
        onSignUp: (username, password) => {
            API.signup(username, password).then(response => {
                if (response.signedIn) {
                    const user = response.user.username;
                    localStorage.setItem('user', user);
                    dispatch(signin(user, null));
                    browserHistory.push('/counter');
                } else {
                    const error = response.message;
                    dispatch(signin(null, error));
                }
            });
        },
        onSignOut: () => {
            localStorage.clear();
            dispatch(signout(null));
            dispatch(reset());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
