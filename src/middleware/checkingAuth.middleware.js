const checkingauth=async(req,res,next)=>{
    if(req.user){
        const message='you are already logged in';
        const url='/home'
        req.app.set('layout','errorPage');
       return res.render('errorPage',{message,url});
    }
    else{
        next();
    }
}
module.exports={
    checkingauth,
}