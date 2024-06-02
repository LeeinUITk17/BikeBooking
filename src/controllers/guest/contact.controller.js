
class contactController{
    
    getAll=async(req,res)=>{
       return res.render('guestmode/contact');
    }
   
}
module.exports=new contactController();