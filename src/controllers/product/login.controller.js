const{
    login : loginService,
    register: registerService,
}=require('../../services/booking/login.service');
const passport = require('passport');
class loginController{
    getAll=async(req,res)=>{
       return res.render('login/formlogin');
    }
    getForm=async(req,res)=>{
        return res.render('login/formregister');
    }
    register = async (req, res, next) => {
        try {
            console.table(req.body);
            
           const user= await registerService(req.body);
           req.login(user, (err) => {
            if (err) {
                return res.render('login/formlogin');
            }
            return res.render('login/formlogin');
        });
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
            return res.render('/login');
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
}
module.exports=new loginController();