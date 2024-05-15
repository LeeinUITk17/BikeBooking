const {
    getproduct,
    getproductbyid,
    updateproduct,
} = require('../../services/admin/product.service');
const {
    getuserbyid,
} = require('../../services/admin/user.service');
const {
    addcontract
}=require('../../services/admin/contract.service');
class shopController {
    getAll = async(req, res) => {
        let page = parseInt(req.query.page) || 1; 
        let limit = 9; 
        let skip = (page - 1) * limit; 
    
        let data = await getproduct('active').skip(skip).limit(limit).exec(); 
    
        let totalProducts = await getproduct('active').countDocuments(); 
        let pages = Math.ceil(totalProducts / limit); 
    
        return res.render('shop/view', { data, page: page, limit: limit, pages: pages, currentPage: page });
    }

    getForm = async(req, res) => {
        const { id, salerID } = req.params;
        if (id) {
            const data = await getproductbyid(id);
            const saler = await getuserbyid(salerID);
            return res.render('shop/detail', { data, saler });
        }
        return res.redirect('/shop');
    }
    addcontract=async(req,res)=>{
        const data=req.body;
        console.log(data);
       const contract= await addcontract(data);
       await updateproduct(data.productID,{hireState:'onHire'});
      const product=await getproductbyid(contract.productID);
      const saler=await getuserbyid(contract.salerID);
      req.flash("warning", "đặt xe thành công, chủ thuê sẽ liên lạc bạn sớm thông qua thông tin liên lạc của bạn!!", false);
        return res.render('contract/detail',{product:product, saler:saler,contract:contract});
    }
}

module.exports = new shopController();