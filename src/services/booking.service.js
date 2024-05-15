const productmodel=require('../model/booking/product.model');

class productservice{
    async getproducts(){
        return await productmodel.find({status: "active",hireState:"rentOut"});
    }
}

module.exports=new productservice();