const express = require('express');
const shopController = require('../../../controllers/product/shop.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/', catchAsync(shopController.getAll));
router.get('/detail/:id/:salerID', catchAsync(shopController.getForm));
router.post('/addcontract',catchAsync(shopController.addcontract));
module.exports = router;