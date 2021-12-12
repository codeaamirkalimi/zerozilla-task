'use strict';

const router = require('express-promise-router')();

// controllers
const userController = require('../../controllers/app/userController');

router.post('/create/agency', userController.createAgency);
router.put('/update/client/:clientId', userController.updateClientDetail);
router.get('/agency/detail', userController.getAgencyDetail);

module.exports = router;
