const productmodel=require('../model/booking/product.model');

class productservice{
    async getproducts(){
        return await productmodel.find({status: "active"}).sort({ordering: 1});
    }
}

module.exports=new productservice();