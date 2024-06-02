const express = require('express');
const contactController = require('../../../controllers/guest/contact.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/', catchAsync(contactController.getAll));
module.exports = router;