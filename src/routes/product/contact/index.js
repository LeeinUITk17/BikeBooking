const express = require('express');
const contactController = require('../../../controllers/product/contact.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/', catchAsync(contactController.getAll));
router.post('/',catchAsync(contactController.sendContactMail));
module.exports = router;