const express = require('express');
const contractController = require('../../../controllers/product/contract.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/', catchAsync(contractController.getAll));
router.get('/detail/:productid/:salerid', catchAsync(contractController.getForm));
module.exports = router;