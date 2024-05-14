const {Schema}=require("mongoose");
const mongoose=require("mongoose");

const COLLECTION_NAME="setting";

const list=new Schema({
    facebook:String,
    twitter:String,
    instagram:String,
    youtube:String,
});

const newSchema=new Schema({
   script:{
         type:String,
         required:true,
    },
   email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    Social:{
        type:[list],
        default:[],
    },
    logo:{
        type:String,
        required:true,
    },
    icon:{
        type:String,
        required:true,
    },

},
{
    timestamps:true,
    collection:COLLECTION_NAME,
}
);
module.exports=mongoose.model(COLLECTION_NAME,newSchema);