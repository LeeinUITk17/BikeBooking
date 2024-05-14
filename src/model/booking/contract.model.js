const {Schema}=require("mongoose");
const mongoose=require("mongoose");

const COLLECTION_NAME="contract";

const newSchema=new Schema({
    productID:{
        type:String,
        required:true,
    },
    salerID:{
        type:String,
        required:true,
    },
    userID:{
        type:String,
        required:true,
    },
    charging:{
        type:Number,
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
    expiresAt:{
        type:Date,
        default:Date.now,
    },
    status:{
        type:String,
        default:"active",
        enum:["active","inactive"],
    },
},
{
    timestamps:true,
    collection:COLLECTION_NAME,
}

);
module.exports=mongoose.model(COLLECTION_NAME,newSchema);