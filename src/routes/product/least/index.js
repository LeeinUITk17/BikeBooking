const express = require('express');
const leastController = require('../../../controllers/product/least.controller');
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');
const {cloudinaryHelper}=require('../../../helper/cloudinary.helper');

router.get('/', catchAsync(leastController.getAll));
router.get('/detail', catchAsync(leastController.getForm));
router.post('/', 
  cloudinaryHelper.fields([
    { name: 'filepond', maxCount: 3 }, 
    { name: 'vrcertificateFront', maxCount: 1 },
    { name: 'vrcertificateRear', maxCount: 1 },
    { name: 'minsurance', maxCount: 1 },
    { name: 'image', maxCount: 1},
  ]),
  (err, req, res, next) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).send('Error uploading file');
    }
    next();
  }, 
  catchAsync(leastController.addOrUpdateItem)
);
module.exports = router;    