const express = require('express');
const homeController = require('../../../controllers/product/home.controller');
const router = express.Router();
const {catchAsync}=require('../../../apps/utils/catchAsync');
router.get('/', catchAsync(homeController.getAll));
module.exports = router;