const productservice=require('../services/booking.service');
module.exports= async(req,res,next)=>{
    Promise.all([
        productservice.getproducts(),
    ]).then(([listProducts,])=>{
        res.locals.listProducts = listProducts;
        // console.log(listProducts);
        next();
    }).catch((err)=>{
        next(err);
    })
}