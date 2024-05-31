const express = require("express");
const router = express.Router();
const multer = require('multer');

const {catchAsync}=require('../../../apps/utils/catchAsync');
const productController = require("../../../controllers/admin/product.controller");

router.use(express.json());

router.get("/form", catchAsync(productController.getForm));
router.get("/form/:id", catchAsync(productController.getForm));
router.get("/delete/:id", catchAsync(productController.deleteItem));
router.get('/changeStatus/:id/:status', catchAsync(productController.updateStatus));

router.get("(/:status)?", catchAsync(productController.getAll));  

router.get('(/:status)?',catchAsync(productController.statusCount));

router.post("/changeStatusTool", catchAsync(productController.statusTool));

module.exports = router;