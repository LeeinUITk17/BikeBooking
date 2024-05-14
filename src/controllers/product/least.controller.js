const {
    addproduct,
    getproduct,
    getproductbyid,
    deteleproduct,
    updateproduct,
}= require('../../services/admin/product.service');
const mainName = 'least';
const linkprefix = `/${mainName}`;
const {imageHelper}=require('../../helper/image.helper');
const path = require('path');
const cloudinary = require('cloudinary').v2;
class leastController{
    getAll=async(req,res)=>{
       return res.render('least');
    }
    getForm=async(req,res)=>{
        return res.render('least/form');
    }
    
    addOrUpdateItem = async (req, res) => {
        try {
            
            const uploadedFiles = await Promise.all([
                cloudinary.uploader.upload(req.files['vrcertificateFront'][0].path),
                cloudinary.uploader.upload(req.files['vrcertificateRear'][0].path),
                cloudinary.uploader.upload(req.files['minsurance'][0].path),
                cloudinary.uploader.upload(req.files['image'][0].path)
            ]);
    
            const filePaths = {
                vrcertificateFront: uploadedFiles[0].secure_url,
                vrcertificateRear: uploadedFiles[1].secure_url,
                minsurance: uploadedFiles[2].secure_url,
                image: uploadedFiles[3].secure_url,
            };
            console.log(filePaths);
    
    
            if (!req.files.filepond || req.files.filepond.length === 0 || req.files.filepond.length !=3 ) {
                console.log("error list file");
                req.flash("warning", "Tạo item thất bại", false);
                return res.redirect(`${linkprefix}`);
            }
            const productID = await addproduct(req.body);
            console.log(productID);
            await updateproduct(productID, filePaths);

            const filepondUploads = await Promise.all(req.files.filepond.map(file => cloudinary.uploader.upload(file.path)));
    
            for (const file of filepondUploads) {
                const newListImage = { Image: file.secure_url };
                const item = await getproductbyid(productID);
                item.List.push(newListImage);
                await item.save();
            }
    
            req.flash("success", "Tạo item thành công", false);
            res.redirect(`${linkprefix}`);
        } catch (error) {
            req.flash("warning", "Tạo item thất bại", false);
            console.error('Error processing form:', error);
            res.status(500).send('Error processing form');
        }
    };
    
}
module.exports=new leastController();