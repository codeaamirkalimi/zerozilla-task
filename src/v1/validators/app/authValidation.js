'use strict';

const Joi = require('joi');

module.exports = {

  validateCreateClient: (input) => {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      address1: Joi.string().required(),
      address2: Joi.string().optional(),
      state: Joi.number().required(),
      city: Joi.string().required(),
      phone: Joi.string().required(),
      address: Joi.string().required(),
    });
    return Joi.validate(input, schema);
  },

};
