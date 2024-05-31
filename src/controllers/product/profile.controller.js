const {
  updateuser,
  getuserbyid,
} = require('../../services/admin/user.service');
const {
  imageHelper,
} = require('../../helper/news.helper');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fieldimage1s = 'avatar';
const mainName = 'profile';
const linkprefix = `/${mainName}`;
class profileController {
  getAll = async (req, res) => {
    try {
      let account = await getuserbyid(req.user._id);
      return account ? res.render('profile', { account }) : res.redirect('/home');
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.redirect('/home');
    }
  }

  updateprofile = async (req, res) => {
    try {
            const id= req.user._id;
       await updateuser(id,req.body);

       if (!req.files.imagecccd || req.files.imagecccd.length === 0 || req.files.imagecccd.length !=2 ) {
        console.log("you need update enough files to upload images!");
        req.flash("warning", "you need update enough files to upload images!", false);
        return res.redirect(`${linkprefix}`);
    }
    else if(!req.files.certificate || req.files.certificate.length === 0 || req.files.certificate.length !=2 ) {
      console.log("you need update enough files to upload images!");
      req.flash("warning", "you need update enough files to upload images!", false);
      return res.redirect(`${linkprefix}`);
  }
      const imagecccdUploads = await Promise.all(req.files.imagecccd.map(file => cloudinary.uploader.upload(file.path)));
      const itemcccd = await getuserbyid(id);
      for (const image of itemcccd.imagecccd) {
        const publicId = image.Image.split('/').pop().split('.')[0]; // Extract public ID from URL
        await cloudinary.uploader.destroy(publicId);
    }
    
    itemcccd.imagecccd = []; 
      for (const file of imagecccdUploads) {
          const newListImage = { Image: file.secure_url };
         
          itemcccd.imagecccd.push(newListImage);
          await itemcccd.save();
      }
      const certificateUploads = await Promise.all(req.files.certificate.map(file => cloudinary.uploader.upload(file.path)));
      const itemcer = await getuserbyid(id);
      for (const image of itemcer.certificate) {
        const publicId = image.Image.split('/').pop().split('.')[0]; // Extract public ID from URL
        await cloudinary.uploader.destroy(publicId);
    }
    itemcer.certificate = []; 
      for (const file of certificateUploads) {
          const newListImage = { Image: file.secure_url };
          itemcer.certificate.push(newListImage);
          await itemcer.save();
      }

      req.flash("success", "Tạo item thành công", false);
      res.redirect(`${linkprefix}`);
  } catch (error) {
      req.flash("warning", "Tạo item thất bại", false);
      console.error('Error processing form:', error);
      res.status(500).send('Error processing form');
  }
  };

  imageUpload = async (req, res, next) => {
      //console.log('image upload');
      const { id } = req.params;
      if (!id) {
          console.log('id not found');
          return res.redirect(`/profile`);
      }
     
      imageHelper('avatar')(req,res,async(err)=>{
        try {
          const filePath = path.join(req.file.filename);
          req.body.file = filePath;
          await updateuser(id, { avatar: filePath });
          const account = await getuserbyid(req.user._id);
          return res.render('profile', { account })
        } catch (error) {
          console.error('Error processing form:', error);
          return res.redirect(`/profile`);
        }
      });
  };

  cloudinaryImage=async(req,res,next)=>{
    try {
        if (!req.file) {
            console.log('No file uploaded');
            return res.redirect(`/profile`);
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        await updateuser(req.user._id, { avatar: result.secure_url });
        const account = await getuserbyid(req.user._id);
        return res.render('profile', { account });
    } catch (error) {
        console.error('Error processing form:', error);
        return res.redirect(`/profile`);
    }
  }
}

module.exports = new profileController();
