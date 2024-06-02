class homeController{
    getAll=async(req,res)=>{
       return res.render('guestmode/home');
    }
}
module.exports=new homeController();