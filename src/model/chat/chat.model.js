const { Schema }=require("mongoose");
const mongoose=require("mongoose");

const COLLECTION_NAME="message";
const newSchema=new Schema({
    room:{
        type:String,
        required:true,
    },
    message:{
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