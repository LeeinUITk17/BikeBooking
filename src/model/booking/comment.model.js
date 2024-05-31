const { Schema }=require("mongoose");
const mongoose=require("mongoose");

const COLLECTION_NAME="comment";
const newSchema=new Schema({

    name:{
        type:String,
        required:true,
    },
   auth:{
      type:String,
      required:true,
   },
   avatar:{
    type:String,
    required:true,
   },
   comment:{
    type:String,
    required:true,
   }
    },
    {
        timestamps:true,
        collection:COLLECTION_NAME,
    }
);

module.exports=mongoose.model(COLLECTION_NAME,newSchema);