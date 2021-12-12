'use strict';

// node modules
const _ = require('lodash');

// models
const Agency = require('../../models/Agency');
const Client = require('../../models/Client');

// helpers
const { respondSuccess, respondError } = require('../../helpers/response');
const { getMessageFromValidationError } = require('../../helpers/utils');
const { validateCreateClient } = require('../../validators/app/authValidation');
const constValues = require('../../helpers/constants');
const localesKeys = require('../../../locales/keys.json');

module.exports = {

  createAgency: async(req, res, next) => {
    let clientsIds = [];
    const { body } = req;
    const { error } = validateCreateClient(body);
    if (error) {
      return next(respondError(getMessageFromValidationError(error)));
    }
    const newAgency = new Agency();
    newAgency.name = body.name;
    newAgency.address1 = body.address1;
    newAgency.address2 = body.address2;
    newAgency.state = body.state;
    newAgency.city = body.city;
    newAgency.phone = body.phone;
    const clientData = Array.from(body.clients);
    clientData.map(async clientDetails => {
      let client = {
        name: clientDetails.name,
        email: clientDetails.email,
        phone: clientDetails.phone,
        totalBill: clientDetails.totalBill,
      };
      const newClient = new Client(client);
      clientId = await newClient.save();
      clientsIds.push(clientId);
    });
    newAgency.clients = clientsIds;
    await newAgency.save();
    return respondSuccess(res, req.__(localesKeys.global.ADDED_SUCCESSFULLY), constValues.StatusCode.CREATED);
  },

  updateClientDetail: async(req, res, next) => {
    const clientId = req.params['clientId'];
    const { error } = validateClientUpdate(body);
    if (error) {
      return next(respondError(getMessageFromValidationError(error)));
    }
    const clientData = await Client.findOne({ _id: clientId});
    if (!clientData) {
      return respondFailure(res, req.__(localesKeys.user.USER_NOT_FOUND), constValues.StatusCode.NOT_FOUND);
    }
    await User.updateOne({ _id: clientId }, {
      $set: {
        name: clientDetails.name,
        email: clientDetails.email,
        phone: clientDetails.phone,
        totalBill: clientDetails.totalBill,
      },
    });
    return respondSuccess(res, req.__(localesKeys.global.UPDATED_SUCCESSFULLY));
  },

  getAgencyDetail: async(req, res, next) => {
    const agencyDetails = await Agency.find()
                          .populate({ path: 'clients', select: 'name totalBill'})
                          .select('name')
                          .sort({ totalBill: -1 });
    return respondSuccess(res, req.__(localesKeys.global.REQUEST_WAS_SUCCESSFULL), constValues.StatusCode.OK, agencyDetails);
  }

};
