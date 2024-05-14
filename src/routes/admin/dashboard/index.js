const express = require('express');
const dashboardController = require('../../../controllers/admin/dashboard.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/', catchAsync(dashboardController.getAll));
module.exports = router;