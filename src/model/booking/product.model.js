const {Schema}=require("mongoose");
const mongoose=require("mongoose");

const COLLECTION_NAME="product";

const list=new Schema({
    brand:String,
    frame:String,
    machine:String,
    year:Number,
    odo:Number,
    license:String,
    state:String,
}); 

const location=new Schema({
    city:String,
    district:String,
    ward:String,
    street:String,
})


const Listimage=new Schema({
    Image:{
      type:String,
    }
  })

const newSchema=new Schema({
   name:{
       type:String,
       required:true,
   },
   description:{
       type:String,
   },
   address:{
       type:[location],
       default:[],
   },
   productinformation:{
    type:[list],
    default:[],
   },
   ordering:{
       type:Number,
       min:1,
       default:1,
   },
   createdAt:{
       type:Date,
       default:Date.now,
   },
   salerID:{
       type:String,
      // required:true,
   },
   image:{
       type:String,
   },
    status:{
         type:String,
         default:"inactive",
         enum:["active","inactive"],
    },
    category:{
        type:String,
       // required:true,
    },
    vrcertificateFront:{
        type:String,
    },
    vrcertificateRear:{
        type:String,
    },
    minsurance:{
        type:String,
    },
    price:{
        type:Number,
    },
    List:{
        type: [Listimage],
        default:[],
       },
       hireState:{
        type:String,
        default:"rentOut",
        enum:["rentOut","onHire"],
    }
},
{
    timestamps:true,
    collection:COLLECTION_NAME,
}
);
module.exports=mongoose.model(COLLECTION_NAME,newSchema);