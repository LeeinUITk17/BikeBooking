const express = require('express');
const loginController = require('../../../controllers/product/login.controller');
const router = express.Router();


const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/', catchAsync(loginController.getAll));
router.get('/add', catchAsync(loginController.getForm));
router.post('/',catchAsync(loginController.login));
router.post('/add',catchAsync(loginController.register));
router.get('/out',catchAsync(loginController.logout));
module.exports = router;