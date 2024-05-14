class homeController{
    getAll=async(req,res)=>{
        req.flash("success", "Update item thành công", false);
       return res.render('home');
    }
}
module.exports=new homeController();