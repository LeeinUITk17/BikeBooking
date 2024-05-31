const express = require('express');
const router = express.Router();
const profileController = require('../../../controllers/product/profile.controller');

const {catchAsync}=require('../../../apps/utils/catchAsync');
const {cloudinaryHelper}=require('../../../helper/cloudinary.helper');

router.get('/', catchAsync(profileController.getAll));
router.post('/update', 
cloudinaryHelper.fields([
  { name: 'imagecccd', maxCount: 2 }, 
  { name: 'certificate', maxCount: 2 },
]),
(err, req, res, next) => {
  if (err) {
    console.error('Multer error:', err);
    return res.status(500).send('Error uploading file');
  }
  next();
},catchAsync(profileController.updateprofile));
router.post('/upload', cloudinaryHelper.single('avatar'),catchAsync( profileController.cloudinaryImage));
module.exports = router;

