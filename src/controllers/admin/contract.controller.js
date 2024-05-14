class dashboardController{
    getAll=async(req,res)=>{
       return res.render('admin/contract');
    }
}
module.exports=new dashboardController();