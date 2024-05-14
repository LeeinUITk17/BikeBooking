class contactController{
    getAll=async(req,res)=>{
       return res.render('admin/contact');
    }
}
module.exports=new contactController();