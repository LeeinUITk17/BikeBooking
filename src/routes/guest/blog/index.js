const express = require('express');
const blogController = require('../../../controllers/guest/blog.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');


router.get('/', catchAsync(blogController.getAll));
router.get('/blogdetail/:id', catchAsync(blogController.getDetail));

module.exports = router;