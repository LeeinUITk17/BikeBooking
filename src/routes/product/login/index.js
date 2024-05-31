const express = require('express');
const loginController = require('../../../controllers/product/login.controller');
const router = express.Router();


const {catchAsync}=require('../../../apps/utils/catchAsync');
const {cloudinaryHelper}=require('../../../helper/cloudinary.helper');

router.get('/', catchAsync(loginController.getAll));
router.get('/add', catchAsync(loginController.getForm));
router.post('/',catchAsync(loginController.login));
router.post('/add',catchAsync(loginController.register));
router.get('/out',catchAsync(loginController.logout));
router.post('/image/:id', 
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
},catchAsync(loginController.ImageUpload));
module.exports = router;