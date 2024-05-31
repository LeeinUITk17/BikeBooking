const express = require('express');
const chatController = require('../../../controllers/product/chat.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('/', catchAsync(chatController.getAll));
// router.get('/:id', catchAsync(chatController.getMessage));
// router.post('/',catchAsync(chatController.createMessage));
// router.get('/delete/:id',catchAsync(chatController.deleteMessage));
module.exports = router;