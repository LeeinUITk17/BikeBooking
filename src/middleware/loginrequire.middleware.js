const loginrequire=async(req,res,next)=>{
    if(!req.user){
        const message='You need to login to access this page';
        const url='/login'
        req.app.set('layout','errorPage');
       return res.render('errorPage',{message,url});
    }
    else{
        next();
    }
}
module.exports={
    loginrequire,
}