const express = require('express');
const blogController = require('../../../controllers/product/blog.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');
const {cloudinaryHelper}=require('../../../helper/cloudinary.helper');

router.get('/', catchAsync(blogController.getAll));
router.get('/blognew', catchAsync(blogController.getForm));
router.get('/blogdetail/:id', catchAsync(blogController.getDetail));

router.post('/blognew',
cloudinaryHelper.fields([
    { name: 'avatar', maxCount: 1 }, 
  ]),
  (err, req, res, next) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).send('Error uploading file');
    }
    next();
  }, catchAsync(blogController.addnews));

router.post('/comment',catchAsync(blogController.comment));

module.exports = router;