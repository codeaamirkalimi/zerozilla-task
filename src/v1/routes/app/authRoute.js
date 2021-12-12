'use strict';

const passport = require('passport');
const router = require('express-promise-router')();

// controllers
const authController = require('../../controllers/app/authController');

// passport
require('../../helpers/passport');

const requireSignin = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('accessTokenAuth', { session: false });
const requireRefreshAuth = passport.authenticate('refreshTokenAuth', { session: false });

// candidate
router.get('/token', requireRefreshAuth, authController.tokenRefresh);
router.post('/signUp', authController.signUp);
router.post('/login', requireSignin, authController.signIn);
router.get('/logout', requireAuth, authController.logout);

// company

module.exports = router;
