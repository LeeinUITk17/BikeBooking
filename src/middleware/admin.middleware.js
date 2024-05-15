const adminservice=require('../services/admin.service');
module.exports= async(req,res,next)=>{
    Promise.all([
        adminservice.getcontact(),
        adminservice.getproduct(),
        adminservice.getuser(),
        adminservice.getproductActive(),
        adminservice.getproductOnhire(),
    ]).then(([listfeedback,numProduct,numUser,productactive,productonhire])=>{
        res.locals.listfeedback = listfeedback;
        res.locals.numProduct = numProduct;
        res.locals.numUser = numUser;
        res.locals.productactive = productactive;
        res.locals.productonhire = productonhire;
        next();
    }).catch((err)=>{
        next(err);
    })
}