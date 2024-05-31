const express = require('express');
const contractController = require('../../../controllers/product/contract.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/', catchAsync(contractController.getAll));
router.get('/:id', catchAsync(contractController.Detail));
module.exports = router;