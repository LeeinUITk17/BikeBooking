const express = require('express');
const router = express.Router();
const settingController = require('../../../controllers/admin/setting.controller')

const {catchAsync}=require('../../../apps/utils/catchAsync');

router.get('' , catchAsync(settingController.getAll));
router.get("/form", catchAsync(settingController.getForm));
router.post(
    "/form/:id",catchAsync(settingController.addOrUpdateItem)
)
router.get("/form/:id", catchAsync(settingController.getForm));
router.post('/upload/:id',catchAsync(settingController.imageUpload));
module.exports = router;