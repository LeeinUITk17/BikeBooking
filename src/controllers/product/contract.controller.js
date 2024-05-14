const {
    getproductbyid
}=require('../../services/admin/product.service');
const {
    getuserbyid
}=require('../../services/admin/user.service');
class contractController{
    getAll=async(req,res)=>{
       return res.render('contract/manager');
    }
    getForm=async(req,res)=>{
        const { productid, salerid}= req.params;
        console.log(productid,salerid);
        const product=await getproductbyid(productid);
        const saler=await getuserbyid(salerid);
        return res.render('contract/detail',{product:product, saler:saler});
    }
}
module.exports=new contractController();