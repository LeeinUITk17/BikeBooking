const express = require("express");
const router = express.Router();
const multer = require('multer');

const {catchAsync}=require('../../../apps/utils/catchAsync');

const randomstring = require('randomstring');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const uniqueFileName = randomstring.generate(10) + file.originalname;
        cb(null, uniqueFileName);
    },
});

const upload = multer({ storage: storage });
const productController = require("../../../controllers/admin/product.controller");

router.use(express.json());

router.get("/form", catchAsync(productController.getForm));
router.post(
  "/form", catchAsync(productController.addOrUpdateItem)
);
router.get("/form/:id", catchAsync(productController.getForm));
router.get("/delete/:id", catchAsync(productController.deleteItem));
router.get('/changeStatus/:id/:status', catchAsync(productController.updateStatus));

router.get("(/:status)?", catchAsync(productController.getAll));  

router.get('(/:status)?',catchAsync(productController.statusCount));

router.post("/changeStatusTool", catchAsync(productController.statusTool));
router.post("/upload/:id", catchAsync(productController.imageUpload));
router.post("/dropzone/:id", upload.array('filepond', 3), catchAsync(productController.dropzoneUpload));

router.post('/deleteImage/:itemId/:imageId', catchAsync(productController.deleteImage));
module.exports = router;