const { Schema }=require("mongoose");
const mongoose=require("mongoose");

const COLLECTION_NAME="category";
const newSchema=new Schema({

    name:{
        type:String,
        required:true,
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
    avatar:{
        type:String,
    },
    description:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    },
    {
        timestamps:true,
        collection:COLLECTION_NAME,
    }
);

module.exports=mongoose.model(COLLECTION_NAME,newSchema);