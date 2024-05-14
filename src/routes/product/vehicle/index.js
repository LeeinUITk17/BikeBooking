const express = require('express');
const vehicleController = require('../../../controllers/product/vehicle.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/', catchAsync(vehicleController.getAll));
router.get('/delete/:id', catchAsync(vehicleController.deleteItem));
module.exports = router;