const{
    login : loginService,
    register: registerService,
}=require('../../services/booking/login.service');
const {
    getuserbyid,
  } = require('../../services/admin/user.service');
const passport = require('passport');
const cloudinary = require('cloudinary').v2;
class loginController{
    getAll=async(req,res)=>{
       return res.render('login/formlogin');
    }
    getForm=async(req,res)=>{
        return res.render('login/formregister');
    }
    register = async (req, res, next) => {
        try {
          //  console.table(req.body);
            
           const user= await registerService(req.body);
           return res.render('Login/updateimage',{id: user._id});
        } catch (err) {
            return res.render('login/formregister');
        }
    };
    
    login = async (req, res, next) => {
        try {
            passport.authenticate('local', (err, user) => {
                if (err) {
                    console.log('error 1');
                    return res.render('login/formlogin');
                }
                if (!user) {
                    return res.redirect('/login');
                }
                req.login(user, async (err) => {
                    if (err) {
                        console.log('error 2');
                        return res.render('login/formlogin');
                    }
                    try {
                    
                        const token = await loginService(req, req.body);
                        res.cookie('jwt', token, { httpOnly: true });
                        return res.redirect('/home');
                    } catch (error) {
                        console.log('error 4');
                        return res.render('login/formlogin');
                    }
                });
            })(req, res, next);
        } catch (err) {
            return res.render('login/formlogin');
        }
    };
    logout = async (req, res, next) => {
        try {
            res.clearCookie('jwt');
            req.logout((err) => {
                if (err) {
                    return next(err); 
                }
                return res.render('login/formlogin');
            });
        } catch (err) {
            next(err);
        }
    };
    ImageUpload=async(req,res)=>{
        console.log('called');
       const {id}=req.params;
       console.log(id);
       try {
   if (!req.files.imagecccd || req.files.imagecccd.length === 0 || req.files.imagecccd.length !=2 ) {
    console.log("you need update enough files to upload images!");
    req.flash("warning", "you need update enough files to upload images!", false);
     return res.render('Login/updateimage');
}
else if(!req.files.certificate || req.files.certificate.length === 0 || req.files.certificate.length !=2 ) {
  console.log("you need update enough files to upload images!");
  req.flash("warning", "you need update enough files to upload images!", false);
   return res.render('Login/updateimage');
}
  const imagecccdUploads = await Promise.all(req.files.imagecccd.map(file => cloudinary.uploader.upload(file.path)));
  const itemcccd = await getuserbyid(id);
  for (const file of imagecccdUploads) {
      const newListImage = { Image: file.secure_url };
      console.log(newListImage);
      itemcccd.imagecccd.push(newListImage);
      await itemcccd.save();
  }
  const certificateUploads = await Promise.all(req.files.certificate.map(file => cloudinary.uploader.upload(file.path)));
  const itemcer = await getuserbyid(id);
  for (const file of certificateUploads) {
      const newListImage = { Image: file.secure_url };
      console.log(newListImage);
      itemcer.certificate.push(newListImage);
      await itemcer.save();
  }

  req.flash("success", "Tạo item thành công", false);
  return res.render('login/formlogin');
} catch (error) {
  req.flash("warning", "Tạo item thất bại", false);
  console.error('Error processing form:', error);
  res.status(500).send('Error processing form');
}
return res.render('login/formlogin');
    }
}
module.exports=new loginController();