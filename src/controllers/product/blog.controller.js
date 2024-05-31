const {
   addItem,
   getItems,
   deleteItem,
   getItemById,
   updateItem,
}=require('../../services/admin/news.service')
const {
   getuserbyid,
}=require('../../services/admin/user.service')
const {
   getItemById:getnewsbyid,
}=require('../../services/admin/news.service')
const commentmodel=require('../../model/booking/comment.model');
const cloudinary = require('cloudinary').v2;
class blogController{
    getAll=async(req,res)=>{
       return res.render('blog/main');
    }
    getForm=async(req,res)=>{
        return res.render('blog/blognew');
     }
     getDetail = async (req, res) => {
      const { id } = req.params; 
      if (!id) {
          return res.redirect('/blog');
      }  
      try {
          const data = await getnewsbyid(id);
          if (!data) {
            console.log('data not found');
              return res.redirect('/blog');
          }  
          const author = await getuserbyid(data.authorID);  
          if (!author) {
            console.log('author not found');
              return res.redirect('/blog');
          }
          const comments=await commentmodel.find({auth:id}).exec();
          //console.log(comments);
          return res.render('blog/blogdetail', { data, author,comments });
      } catch (error) {
          console.error(error);
          return res.redirect('/blog');
      }
  };
     addnews=async(req,res)=>{
      try {
      console.log(req.body);
      const uploadedFiles = await Promise.all([
         cloudinary.uploader.upload(req.files['avatar'][0].path),
     ]);
     const filePaths = {
         avatar: uploadedFiles[0].secure_url,
     };
      await addItem({ ...req.body, ...filePaths });
      console.log('done');
      return res.redirect('/blog');
   } catch (error) {
      console.error('Error processing form:', error);
      //res.status(500).send('Error processing form');
      return res.redirect('/blog');
  }
     
     }
     comment=async(req,res)=>{
        console.log(req.body);
        await commentmodel.create(req.body);
        const auth=req.body.auth;
        return res.redirect(`/blog/blogdetail/${auth}`);
      }
}
module.exports=new blogController();