const productservice=require('../services/booking.service');
module.exports= async(req,res,next)=>{
    Promise.all([
        productservice.getproducts(),
        productservice.getsetting(),
        productservice.getcategory(),
        productservice.getnews(),
    ]).then(([listProducts,listsetting,listcategory,listnews])=>{
        res.locals.listProducts = listProducts;
         res.locals.listsetting = listsetting;
         res.locals.listcategory = listcategory;
         res.locals.listnews = listnews;
         //console.log(listcategory);
        // console.log(listnews.length);
        next();
    }).catch((err)=>{
        next(err);
    })
}