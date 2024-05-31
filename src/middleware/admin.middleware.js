const adminservice=require('../services/admin.service');
module.exports= async(req,res,next)=>{
    Promise.all([
        adminservice.getcontact(),
        adminservice.getproduct(),
        adminservice.getuser(),
        adminservice.getproductActive(),
        adminservice.getproductOnhire(),
        adminservice.getsettingid(), // Add this line
    ]).then(([listfeedback,numProduct,numUser,productactive,productonhire,settingid])=>{
        res.locals.listfeedback = listfeedback;
        res.locals.numProduct = numProduct;
        res.locals.numUser = numUser;
        res.locals.productactive = productactive;
        res.locals.productonhire = productonhire;
        res.locals.settingid=settingid;
        next();
    }).catch((err)=>{
        next(err);
    })
}