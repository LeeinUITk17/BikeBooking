const adminservice=require('../services/admin.service');
module.exports= async(req,res,next)=>{
    Promise.all([
        adminservice.getcontact(),
        adminservice.getproduct(),
        adminservice.getuser(),
        adminservice.getproductActive(),
        adminservice.getproductInactive(),
    ]).then(([listfeedback,numProduct,numUser,productactive,productinactive])=>{
        res.locals.listfeedback = listfeedback;
        res.locals.numProduct = numProduct;
        res.locals.numUser = numUser;
        res.locals.productactive = productactive;
        res.locals.productinactive = productinactive;
        next();
    }).catch((err)=>{
        next(err);
    })
}