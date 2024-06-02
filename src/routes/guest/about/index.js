const express = require('express');
const aboutController = require('../../../controllers/guest/about.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/', catchAsync(aboutController.getAll));
module.exports = router;