
const loginrequire=async(req,res,next)=>{
    if (!req.user) {
        return res.redirect('/guest/home');
    }
    next();
}
module.exports={
    loginrequire,
}