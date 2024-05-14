const express = require('express');
const contractController = require('../../../controllers/admin/contract.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/', catchAsync(contractController.getAll));
module.exports = router;