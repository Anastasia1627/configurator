const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const User = require('../models/user');
const keys = require('../config/keys');
const env = require('../config/env');
const validatePassword = require('../validators/password');
const validateUsername = require('../validators/username');


module.exports = (app, database) => {
    const usersCollection = database.collection('users');

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(cors());

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new LocalStrategy(
        {
            username: 'username',
            password: 'password',
        },
        ((username, password, done) => {
            User.findOne({ username }, (err, user) => {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (user.password !== password) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        }),
    ));

    passport.use(new GitHubStrategy(
        {
            clientID: keys.github.clientID,
            clientSecret: keys.github.clientSecret,
            callbackURL: keys.github.callbackURL,
        },
        ((accessToken, refreshToken, profile, done) => {
            User.findOne({ username: profile.username }, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    user = new User({
                        username: profile.username,
                        email: profile.emails[0].value
                    });

                    user.save((err) => {
                        if (err) console.error(err);
                        return done(err, user);
                    });
                } else {
                    return done(err, user);
                }
            });
        }),
    ));

    app.post('/auth', passport.authenticate('local'),
    (req, res) => {
        res.status(200).json({
            username: req.user.username,
            email: req.user.email,
            id: req.user._id
        });
    });

    app.post('/sign_up', (req, res) => {
        User.findOne({ username: req.body.username }, (err, user) => {
            if (!user) {
                if (!validateUsername(req.body.username)) {
                    return res.status(401).json({ message: 'Username is not valid.' });
                }
                if (!validatePassword(req.body.password)) {
                    return res.status(401).json({ message: 'Password is not valid.' });
                }

                user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                });

                usersCollection.insertOne(user, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        res.json({
                            username: user.username,
                            email: user.email,
                            id: user._id,
                        });
                    }
                });
            }
        });
    });

    app.get('/github', passport.authenticate('github'));

    app.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        res.cookie('authenticated', true);
        res.cookie('username', req.user.username);
        res.cookie('email', req.user.email);
        res.cookie('id', req.user._id);
        res.redirect(`${env.url}/home`);
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json(
            { message: err.message || 'Sorry something broke on the server!' },
        );
    });
};
