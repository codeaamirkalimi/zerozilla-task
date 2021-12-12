'use strict';

// node modules
const _ = require('lodash');

// models
const User = require('../../models/User');

// helpers
const { respondSuccess, respondFailure, respondError } = require('../../helpers/response');
const { validateSendVerificationCode, validateSignIn } = require('../../validators/app/authValidation');
const { getAuthTokens } = require('../../helpers/token');
const constValues = require('../../helpers/constants');
const localesKeys = require('../../../locales/keys.json');

module.exports = {

  tokenRefresh: async(req, res, next) => {
    const { id } = req.user;
    const { accessToken } = getAuthTokens(id, true);
    return respondSuccess(res, req.__(localesKeys.global.REQUEST_WAS_SUCCESSFULL), constValues.StatusCode.OK, { accessToken });
  },

  signUp: async(req, res, next) => {
    const { body, language } = req;
    const { email } = body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return respondFailure(res, req.__(localesKeys.auth.EMAIL_ALREADY_EXISTS), constValues.StatusCode.CONFLICT);
    }

    if (!userExist) {
      const newUser = new User(body);
      await newUser.save();
    }

    return respondSuccess(res, req.__(localesKeys.auth.USER_REGISTERED_SUCCESSFULLY));
  },

  signIn: async(req, res, next) => {
    const { body } = req;
    const { email, password } = body;

    const userData = await User.findOne({ email });

    if (!userData) {
      return respondFailure(res, req.__(localesKeys.auth.USER_NOT_FOUND), constValues.StatusCode.NOT_FOUND);
    }
    userData.comparePassword(password, async(passwordError, isMatch) => {
      if (passwordError) {
        return respondFailure(res, req.__(localesKeys.global.TRY_AGAIN), constValues.StatusCode.INTERNAL_SERVER_ERROR);
      }
      if (!userData.status) {
        return respondFailure(res, req.__(localesKeys.auth.USER_NOT_ACTIVE), constValues.StatusCode.CONFLICT);
      }
      if (!isMatch) {
        return respondFailure(res, req.__(localesKeys.auth.WRONG_PASSWORD), constValues.StatusCode.UNAUTHORIZED);
      }
      const { accessToken, refreshToken } = getAuthTokens(userData.id);
      await User.updateOne({ _id: userData.id }, {
        $set: { updatedAt: new Date()},
      });
      return respondSuccess(res, req.__(localesKeys.auth.LOG_IN_SUCCESSFULLY), constValues.StatusCode.OK, {
        accessToken: accessToken,
        refreshToken: refreshToken,
        userData: _.pick(userData),
      });
    });
  },


  logout: async(req, res, next) => {
    const { id } = req.user;
    await User.updateOne({ _id: id }, { $set: { deviceToken: null } });
    return respondSuccess(res, req.__(localesKeys.auth.LOG_OUT_SUCCESSFULLY));
  },
};
