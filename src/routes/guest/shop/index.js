const express = require('express');
const shopController = require('../../../controllers/guest/shop.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get("(/:state)?", catchAsync(shopController.getAll));
router.get('/detail/:id/:salerID', catchAsync(shopController.getForm));
module.exports = router;