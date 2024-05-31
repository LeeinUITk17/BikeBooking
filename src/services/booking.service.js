const productmodel=require('../model/booking/product.model');
const settingmodel=require('../model/booking/setting.model');
const categorymodel=require('../model/booking/category.model');
const newsmodel=require('../model/booking/news.model');
class productservice{
    async getproducts(){
        return await productmodel.find({status: "active"});
    }
    async getsetting(){
        return await settingmodel.find();
    }
    async getcategory(){
        return await categorymodel.find({special:"true", status:"active"}).select('slug');
    }
    async getnews(){
        return await newsmodel.find({status:"active"});
    }
}

module.exports=new productservice();