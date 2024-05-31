const {
    addsetting,
    getsetting,
    getsettingbyid,
    detelesetting,
    updatesetting,
} =require('../../services/admin/setting.service');

const path=require('path');
const { imageHelper } = require("../../helper/news.helper");
const mainName = 'setting/home';
const cloudinary = require('cloudinary').v2;
const linkprefix = `/admin/${mainName}`;

class settingcontroller{
    gethome = async ( req , res , next) => {
      //console.log(res.locals.settingid[0]);
      const data=res.locals.settingid[0];
         return res.render('admin/setting/home',{data:data});
      }
      getabout = async ( req , res , next) => {
        const data=res.locals.settingid[0];
          res.render('admin/setting/about',{data:data});
      }
      getcontact = async ( req , res , next) => {
        const data=res.locals.settingid[0];
          res.render('admin/setting/contact',{data:data});
      }
      getrental = async ( req , res , next) => {
        const data=res.locals.settingid[0];
          res.render('admin/setting/rental',{data:data});
      }
      getblog = async ( req , res , next) => {
        const data=res.locals.settingid[0];
          res.render('admin/setting/blog',{data:data});
      }
      // getForm = async (req, res, next) => {
      //     let { id } = req.params;
      //     if (id == "") {
      //       res.render("admin/setting/form");
      //     } else {
      //       let data = await getsettingbyid(id);
      //       res.render("admin/setting/form", { data });
      //     }
      // }

uploadhero=async(req,res,next)=>{
  const { page } = req.params;
let index;

switch(page) {
    case 'about':
        index = 1;
        break;
    case 'blog':
        index = 2;
        break;
    case 'contact':
        index = 3;
        break;
    case 'rental':
        index = 4;
        break;
    default:
        index=0;
}
  try {
    const item = await getsettingbyid(res.locals.settingid[0]._id);
    (!item.hero[index])?item.hero.push(req.body.hero):item.hero[index]=req.body.hero;
    await item.save();
    return res.redirect(`${linkprefix}`);
  } catch (error) {
    console.error('Error processing form:', error);
    res.status(500).send('Error processing form');
    return res.redirect(`${linkprefix}`);
  }
}


      addOrUpdateItemhero = async (req, res) => {
        try {
          const item = await getsettingbyid(res.locals.settingid[0]._id);
          (!item.hero[0])?item.hero.push(req.body.hero):item.hero[0]=req.body.hero;
          await item.save();
          const uploadedFiles = await Promise.all([
              cloudinary.uploader.upload(req.files['heroimage'][0].path),
          ]);
  
          const filePaths = {
              heroimage: uploadedFiles[0].secure_url,
          };
          console.log(filePaths);
          await updatesetting(res.locals.settingid[0]._id, filePaths);
         // req.flash("success", "Update hero section thành công", false);
          return res.redirect(`${linkprefix}`);
      } catch (error) {
          //req.flash("warning", "Tạo item thất bại", false);
          console.error('Error processing form:', error);
          res.status(500).send('Error processing form');
          return res.redirect(`${linkprefix}`);
      }
      };
      addOrUpdateItemwhychoose = async (req, res) => {
        try {
        await updatesetting(res.locals.settingid[0]._id,req.body);
          const uploadedFiles = await Promise.all([
              cloudinary.uploader.upload(req.files['whychooseimage'][0].path),
          ]);
  
          const filePaths = {
              whychooseimage: uploadedFiles[0].secure_url,
          };
          console.log(filePaths);
          await updatesetting(res.locals.settingid[0]._id, filePaths);
         // req.flash("success", "Update hero section thành công", false);
          return res.redirect(`${linkprefix}`);
      } catch (error) {
          //req.flash("warning", "Tạo item thất bại", false);
          console.error('Error processing form:', error);
          res.status(500).send('Error processing form');
          return res.redirect(`${linkprefix}`);
      }
      };
      addOrUpdateItemwehelp = async (req, res) => {
        try {
        await updatesetting(res.locals.settingid[0]._id,req.body);
        if (!req.files.helpImage || req.files.helpImage.length === 0 || req.files.helpImage.length !=3 ) {
          console.log("error list file");
        //  req.flash("warning", "Tạo item thất bại", false);
          return res.redirect(`${linkprefix}`);
      }

      const helpImageUploads = await Promise.all(req.files.helpImage.map(file => cloudinary.uploader.upload(file.path)));
      const item = await getsettingbyid(res.locals.settingid[0]._id);
      for (const image of item.helpImage) {
        const publicId = image.Image.split('/').pop().split('.')[0]; // Extract public ID from URL
        await cloudinary.uploader.destroy(publicId);
    }
    item.helpImage = []; 
            for (const file of helpImageUploads) {
                const newListImage = { Image: file.secure_url };
                // const item = await getsettingbyid(res.locals.settingid[0]._id);
                item.helpImage.push(newListImage);
                await item.save();
            }
         // req.flash("success", "Update hero section thành công", false);
          return res.redirect(`${linkprefix}`);
      } catch (error) {
          //req.flash("warning", "Tạo item thất bại", false);
          console.error('Error processing form:', error);
          res.status(500).send('Error processing form');
          return res.redirect(`${linkprefix}`);
      }
      };
      addOrUpdateItemtestimonial = async (req, res) => {
        try {
        await updatesetting(res.locals.settingid[0]._id,req.body);
        if (!req.files.testimonialImage || req.files.testimonialImage.length === 0 || req.files.testimonialImage.length !=5 ) {
          console.log("error list file");
        //  req.flash("warning", "Tạo item thất bại", false);
          return res.redirect(`${linkprefix}`);
      }

      const testimonialImageUploads = await Promise.all(req.files.testimonialImage.map(file => cloudinary.uploader.upload(file.path)));
      const item = await getsettingbyid(res.locals.settingid[0]._id);
      for (const image of item.testimonialImage) {
        const publicId = image.Image.split('/').pop().split('.')[0]; // Extract public ID from URL
        await cloudinary.uploader.destroy(publicId);
    }
    item.testimonialImage = []; 
            for (const file of testimonialImageUploads) {
                const newListImage = { Image: file.secure_url };
              //  const item = await getsettingbyid(res.locals.settingid[0]._id);
                console.log(newListImage);
                item.testimonialImage.push(newListImage);
                await item.save();
            }
         // req.flash("success", "Update hero section thành công", false);
          return res.redirect(`${linkprefix}`);
      } catch (error) {
          //req.flash("warning", "Tạo item thất bại", false);
          console.error('Error processing form:', error);
          res.status(500).send('Error processing form');
          return res.redirect(`${linkprefix}`);
      }
      };
      deleteItem = async (req, res, next) => {  
        let { id } = req.params;
        await detelesetting(id);
        req.flash("success", "Delete item thành công", false);
        res.redirect(`${linkprefix}all`);
      };
}
module.exports = new settingcontroller();