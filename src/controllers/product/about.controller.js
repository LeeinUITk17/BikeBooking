class aboutController{
    getAll=async(req,res)=>{
       return res.render('about');
    }
}
module.exports=new aboutController();