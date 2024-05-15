const {
    getproductbyid
}=require('../../services/admin/product.service');
const {
    getuserbyid
}=require('../../services/admin/user.service');
const {
    getcontractbysalerID,
    getcontractbyid,
}=require('../../services/admin/contract.service');
class contractController{
    getAll=async(req,res)=>{
        const contracts = await getcontractbysalerID(req.user._id);
       // console.log(contracts.length);
        const data = await Promise.all(contracts.map(async contract => {
            const product = await getproductbyid(contract.productID);
            return {
                ...contract._doc,
                product,
            };
        }));
       return res.render('contract/manager',{data});
    }
    getForm=async(req,res)=>{
        const {id}=req.params;
       const contract=await getcontractbyid(id);
       console.log(contract);
       return;
        return res.render('contract/detail',{product:product, saler:saler});
    }
}
module.exports=new contractController();