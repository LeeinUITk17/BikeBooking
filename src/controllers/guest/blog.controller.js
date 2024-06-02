
 const {
    getItemById:getnewsbyid,
 }=require('../../services/admin/news.service')
 const {
    getuserbyid,
 }=require('../../services/admin/user.service');
 class blogController{
     getAll=async(req,res)=>{
        return res.render('guestmode/blog/main');
     }
      getDetail = async (req, res) => {
       const { id } = req.params; 
       if (!id) {
           return res.redirect('/guest/blog');
       }  
       try {
           const data = await getnewsbyid(id);
           if (!data) {
             console.log('data not found');
               return res.redirect('/guest/blog');
           }  
           const author = await getuserbyid(data.authorID);  
           if (!author) {
             console.log('author not found');
               return res.redirect('/guest/blog');
           }
           return res.render('guestmode/blog/blogdetail', { data, author });
       } catch (error) {
           console.error(error);
           return res.redirect('/guest/blog');
       }
   };
 }
 module.exports=new blogController();