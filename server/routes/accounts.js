/* eslint strict: 0, no-console: 0 */
'use strict';

const Firebase = require('firebase');
const crypto = require('crypto');

var config = {
    apiKey: "AIzaSyCggQWwXBEBoOxdxZSKtttdEXlxKr7DrwQ",
    authDomain: "dev-redux-f4d1b.firebaseapp.com",
    databaseURL: "https://dev-redux-f4d1b.firebaseio.com",
    storageBucket: "dev-redux-f4d1b.appspot.com",
    messagingSenderId: "1016976849868"
};

const firebase = Firebase.initializeApp(config);
const users = firebase.database().ref('users');

function hash(password) {
    return crypto.createHash('sha512').update(password).digest('hex');
}

const router = require('express').Router();

router.use(require('body-parser').json());
router.use(require('cookie-parser')());
router.use(require('express-session')({resave: false, saveUninitialized: true, secret: '1234qwerty'}));
router.post('/api/signup', function cb(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.json({signedIn: false, message: 'No username or password'});
    }

    users.child(username).once('value')
        .then(function(snapshot) {
            if (snapshot.exists()) {
                return res.json({signedIn: false, message: 'User already exists'});
            }

            const userObj = {
                username: username,
                passwordHash: hash(password)
            };

            users.child(username).set(userObj);
            req.session.user = userObj;

            res.json({signedIn: true, user: userObj});
        })
        .catch(console.error);
});

router.post('/api/signin', function get(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.json({signedIn: false, message: 'No username or password'});
    }

    users.child(username).once('value')
        .then(function(snapshot) {
            if (!snapshot.exists() || snapshot.child('passwordHash').val() !== hash(password)) {
                return res.json({signedIn: false, message: 'Wrong username or password'});
            }

            const user = snapshot.exportVal();
            req.session.user = user;
            res.json({signedIn: true, user: user});
        })
        .catch(console.error);
});

router.post('/api/signout', function cb(req, res) {
    delete req.session.user;
    res.json({signedIn: false, message: 'You signed out successfully!'});
});

module.exports = router;
