
const {
    addproduct,
    getproduct,
    getproductbyid,
    deleteproduct,
    updateproduct,
    getStatusCounts,
    getproductbysalerID,
}=require('../../services/admin/product.service');
const mainName = 'vehicle';
const linkprefix = `/${mainName}`;
class vehicleController{
    getAll=async(req,res)=>{
        const data=await getproductbysalerID(req.user._id);
       return res.render('vehicle',{data});
    }
    deleteItem = async (req, res, next) => {
        try {
            let { id } = req.params;
            await deleteproduct(id);
            const data = await getproductbysalerID(req.user._id);  
            req.flash("success", "Delete item thành công", false);
           return res.redirect(`${linkprefix}`,{data});
        } catch (error) {
            console.error(error);
            req.flash("warning", "Delete item thất bại", false);
            return res.redirect(`${linkprefix}`);
        }
        };
}
module.exports=new vehicleController();