const express = require("express");
const router = express.Router();

const {catchAsync}=require('../../../apps/utils/catchAsync');

const newController = require("../../../controllers/admin/news.controller");

router.use(express.json());

router.get("/form/:id", catchAsync(newController.getForm));
router.get("/delete/:id", catchAsync(newController.deleteItem));
router.get('/changeStatus/:id/:status', catchAsync(newController.updateStatus));
router.get("(/:status)?", catchAsync(newController.getAll));  
router.get('(/:status)?', catchAsync(newController.statusCount));

router.post("/changeStatusTool", catchAsync(newController.statusTool));

module.exports = router;