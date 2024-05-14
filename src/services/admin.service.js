const contactmodel=require('../model/booking/contact.model');
const productmodel=require('../model/booking/product.model');
const usermodel=require('../model/booking/user.model');


class productservice{
    async  getcontact(){
        return await contactmodel.find();
    }
    async getproduct(){
        return await productmodel.find().select('_id');
    }
    async getuser(){
        return await usermodel.find().select('_id');
    }
    async getproductActive(){
        return await productmodel.find({status:'active'}).select('_id');
    }
    async getproductInactive(){
        return await productmodel.find({status:'inactive'}).select('_id');
    }
}

module.exports=new productservice();