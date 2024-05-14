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
    const { id } = req.params;
    console.log(req.body);
    try {
      await updateuser(id, req.body);
      
  
      if (!req.files.imagecccd || req.files.imagecccd.length === 0) {
        console.log("error imagecccd file");
      } else {
        for (const file of req.files.imagecccd) {
          const filepath = path.join(file.filename); 
          const newlist = { Image: filepath };
          user.imagecccd.push(newlist);
          await user.save();
        }
      }
  
      if (!req.files.certificate || req.files.certificate.length === 0) {
        console.log("error certificate file");
      } else {
        for (const file of req.files.certificate) {
          const filepath = path.join(file.filename); 
          const newlist = { Image: filepath };
          user.certificate.push(newlist);
          await user.save();
        }
      }
      const account = await getuserbyid(req.user._id);
      return res.render('profile', { account });
    } catch (error) {
      console.error('Error processing form:', error);
      return res.redirect(`/profile`);
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
    const { id } = req.params;
    if (!id) {
        console.log('id not found');
        return res.redirect(`/profile`);
    }
    try {
        if (!req.file) {
            console.log('No file uploaded');
            return res.redirect(`/profile`);
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        await updateuser(id, { avatar: result.secure_url });
        const account = await getuserbyid(req.user._id);
        return res.render('profile', { account });
    } catch (error) {
        console.error('Error processing form:', error);
        return res.redirect(`/profile`);
    }
  }
}

module.exports = new profileController();
