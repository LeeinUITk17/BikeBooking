const {
    getmessagebyid,
    addmessage,
    deletemessage,
}=require('../../services/chat.service');
class chatController{
    getAll=async(req,res)=>{
       return res.render('chat/testroom');
    }
    // getMessage=async(req,res)=>{
    //     const {id}=req.params.id;
    //     const data=await getmessagebyid(id);
    //     console.log(data);
    //     return res.render('chat',{data:data});
    // }
    // createMessage=async(req,res)=>{
    //     const data=req.body;
    //     const result=await addmessage(data);
    //     return res.json(result);
    // }
    // deleteMessage=async(req,res)=>{
    //     const {id}=req.params;
    //     const result=await deletemessage(id);
    //     return res.json(result);
    // }
}
module.exports=new chatController();