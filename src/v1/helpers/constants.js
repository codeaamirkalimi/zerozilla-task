'use strict';

module.exports = {

  logger: {
    log: (message) => {
      console.log(message);
    },
  },

  status: {
    ACTIVE: true,
    DEACTIVE: false,
  },

  userType: {
    AGENCY: 1,
    CLIENT: 2,
    ADMIN: 3,
  },

  agencyStatus: {
    ACTIVE: 1,
    DEACTIVE: 2,
  },

  clientStatus: {
    ACTIVE: 1,
    DEACTIVE: 2,
  },

  StatusCode: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
  },

};
