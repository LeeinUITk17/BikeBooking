const express = require("express");
const router = express.Router();
const userController = require("../../../controllers/admin/user.controller");
router.use(express.json());

const {catchAsync}=require('../../../apps/utils/catchAsync');
const {cloudinaryHelper}=require('../../../helper/cloudinary.helper');

router.get("/form", catchAsync(userController.getForm));
router.post(
  "/form/:id",
  catchAsync(userController.addOrUpdateItem)
);
router.get("/form/:id", catchAsync(userController.getForm));
router.get("/delete/:id", catchAsync(userController.deleteItem));
router.get('/changeStatus/:id/:status', catchAsync(userController.updateStatus));

router.get("(/:status)?", catchAsync(userController.getAll));  

router.get('(/:status)?',catchAsync(userController.statusCount));
router.post("/upload/:id",cloudinaryHelper.single('avatar'), catchAsync(userController.cloudinaryImage));
router.post("/changeStatusTool", catchAsync(userController.statusTool));
module.exports = router;