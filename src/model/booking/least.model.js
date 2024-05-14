const {Schema}=require("mongoose");
const mongoose=require("mongoose");

const COLLECTION_NAME="least";

const newSchema=new Schema({
   productID:{
       type:String,
       required:true,
   },
   salerID:{
       type:String,
       required:true,
   },
   price:{
       type:Number,
       required:true,
   },
   createdAt:{
       type:Date,
       default:Date.now,
   },
   description:{
       type:String,
   },
   status:{
       type:String,
       default:"inactive",
       enum:["active","inactive"],
   },
   ordering:{
       type:Number,
       min:1,
       default:1,
   },
},
{
    timestamps:true,
    collection:COLLECTION_NAME,
}
);
module.exports=mongoose.model(COLLECTION_NAME,newSchema);