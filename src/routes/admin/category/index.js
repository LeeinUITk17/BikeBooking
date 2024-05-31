const express = require("express");
const router = express.Router();
const categoryController = require("../../../controllers/admin/category.controller");
const {catchAsync}=require('../../../apps/utils/catchAsync');
const {cloudinaryHelper}=require('../../../helper/cloudinary.helper');
router.use(express.json());
router.get("/form", catchAsync(categoryController.getForm));
router.post(
  "/form/:id",cloudinaryHelper.fields([
    { name: 'avatar', maxCount: 1 }, 
  ]),
  (err, req, res, next) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(500).send('Error uploading file');
    }
    next();
  },catchAsync( categoryController.addOrUpdateItem)
);
router.get("/form/:id", catchAsync(categoryController.getForm));
router.get("/delete/:id", catchAsync(categoryController.deleteItem));
router.get('/changeStatus/:id/:status', catchAsync(categoryController.updateStatus));
router.get("(/:status)?", catchAsync(categoryController.getAll));  
router.get('(:/status)?',catchAsync(categoryController.statusCount));
router.post("/changeStatusTool", catchAsync(categoryController.statusTool));
module.exports = router;