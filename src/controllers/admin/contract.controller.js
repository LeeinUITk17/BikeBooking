const {
    addcontract,
        getcontract,
        getcontractbyid,
        detelecontract,
        updatecontract,
        getStatusCounts,
}=require('../../services/admin/contract.service');
const {
    getproductbyid,
}=require('../../services/admin/product.service');
const {
    getuserbyid,
}=require('../../services/admin/user.service');
class dashboardController{
    getAll = async (req, res) => {
        const contracts = await getcontract();
        const data = await Promise.all(contracts.map(async contract => {
            const product = await getproductbyid(contract.productID);
            const saler = await getuserbyid(contract.salerID);
            const customer = await getuserbyid(contract.userID);
            return {
                ...contract._doc,
                product,
                saler,
                customer
            };
        }));
      //  console.log(data[0].saler.userinformation[0].name);
        return res.render('admin/contract', { data });
    }
}
module.exports=new dashboardController();