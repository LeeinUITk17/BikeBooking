const { Schema } = require('mongoose');
const mongoose=require("mongoose");

const COLLECTION_NAME="setting";

const heroObject=new Schema({
    title:String,
    content:String,
});
const testimonial=new Schema({
    name:String,
    detail:String,
    comment:String,
});
const title=new Schema({
    content:String,
});
const listImage=new Schema({
    Image:String,
  })

const newSchema=new Schema({
     hero:{
        type:[heroObject],
     },
     heroimage:{
        type:String,
     },
     whychoose:{
        type:[heroObject],
     },
     whychooseimage:{
        type:String,
     },
     helpObject:{
        type:[heroObject],
     },
     helpDetails:{
        type:[title],
     },
     helpImage:{
        type:[listImage],
     },
     testimonial:{
        type:[testimonial],
     },
     testimonialtitle:{
       type:String,
     },
     testimonialImage:{
        type:[listImage]
     }
},
{
    timestamps:true,
    collection:COLLECTION_NAME,
}
);
module.exports=mongoose.model(COLLECTION_NAME,newSchema);