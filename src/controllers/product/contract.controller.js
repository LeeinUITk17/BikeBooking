const {
    getproductbyid
}=require('../../services/admin/product.service');
const {
    getuserbyid
}=require('../../services/admin/user.service');
const {
    getcontractbysalerID,
    getcontractbyuserID,
    getcontractbyid,
}=require('../../services/admin/contract.service');
class contractController{
    getAll=async(req,res)=>{
        const contracts = await getcontractbysalerID(req.user._id);
        const usercontracts = await getcontractbyuserID(req.user._id);
       // console.log(contracts.length);
        const data = await Promise.all(contracts.map(async contract => {
            const product = await getproductbyid(contract.productID);
            return {
                ...contract._doc,
                product,
            };
        }));
        const nondata = await Promise.all(usercontracts.map(async contract => {
            const product = await getproductbyid(contract.productID);
            return {
                ...contract._doc,
                product,
            };
        }));
       return res.render('contract/manager',{data,nondata});
    };
    Detail=async(req,res)=>{
        console.log('called');
        const {id}=req.params;
       const contract=await getcontractbyid(id);
       console.log(contract);
       const product=await getproductbyid(contract.productID);
       const saler=await getuserbyid(contract.salerID);
       return res.render('contract/detail',{product:product, saler:saler,contract:contract});
    };
}
module.exports=new contractController();