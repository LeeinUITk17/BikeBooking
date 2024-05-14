class dashboardController{
    getAll=async(req,res)=>{
       return res.render('admin/dashboard');
    }
}
module.exports=new dashboardController();