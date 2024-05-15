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
        return await productmodel.find({status:'active', hireState:'rentOut'}).select('_id');
    }
    async getproductOnhire(){
        return await productmodel.find({hireState:'onHire'}).select('_id');
    }
}

module.exports=new productservice();