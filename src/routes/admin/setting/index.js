const express = require('express');
const router = express.Router();
const settingController = require('../../../controllers/admin/setting.controller')

const {catchAsync}=require('../../../apps/utils/catchAsync');
const {cloudinaryHelper}=require('../../../helper/cloudinary.helper');

router.get('/home' , catchAsync(settingController.gethome));
router.get('/blog' , catchAsync(settingController.getblog));
router.get('/about' , catchAsync(settingController.getabout));
router.get('/contact' , catchAsync(settingController.getcontact));
router.get('/rental' , catchAsync(settingController.getrental));

router.post('/updatehero/:page',catchAsync(settingController.uploadhero));

router.post('/addsettings/hero',cloudinaryHelper.fields([
    { name: 'heroimage', maxCount: 1 }, 
  ]),
  (err, req, res, next) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).send('Error uploading file');
    }
    next();
  }, catchAsync(settingController.addOrUpdateItemhero));
  router.post('/addsettings/whychoose',cloudinaryHelper.fields([
    { name: 'whychooseimage', maxCount: 1 }, 
  ]),
  (err, req, res, next) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).send('Error uploading file');
    }
    next();
  }, catchAsync(settingController.addOrUpdateItemwhychoose));


  router.post('/addsettings/wehelp',cloudinaryHelper.fields([
    { name: 'helpImage', maxCount: 3 }, 
  ]),
  (err, req, res, next) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).send('Error uploading file');
    }
    next();
  }, catchAsync(settingController.addOrUpdateItemwehelp));
  
  router.post('/addsettings/testimonial',cloudinaryHelper.fields([
    { name: 'testimonialImage', maxCount: 5 }, 
  ]),
  (err, req, res, next) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).send('Error uploading file');
    }
    next();
  }, catchAsync(settingController.addOrUpdateItemtestimonial));
module.exports = router;