const { Schema }=require("mongoose");
const mongoose=require("mongoose");

const COLLECTION_NAME="category";
const newSchema=new Schema({

    name:{
        type:String,
        required:true,
    },
    slug:{
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
    avatar:{
        type:String,
    },
    special:{
        type:Boolean,
        default:false,
    },
    description:{
        type:String,
    }
    },
    {
        timestamps:true,
        collection:COLLECTION_NAME,
    }
);

module.exports=mongoose.model(COLLECTION_NAME,newSchema);