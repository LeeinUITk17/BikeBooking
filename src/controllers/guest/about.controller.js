class aboutController{
    getAll=async(req,res)=>{
       return res.render('guestmode/about');
    }
}
module.exports=new aboutController();