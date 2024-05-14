const mongoose=require('mongoose');
const settingmodel=require('../../model/booking/setting.model');

const addsetting=async(body)=>{
    return await settingmodel.create(body);
}
const getsetting=async()=>{ 
   return await settingmodel.find();
}
const getsettingbyid=async(id)=>{
    return await settingmodel.findById(id).exec();
}
const detelesetting=async(id)=>{
    return await settingmodel.deleteOne({_id: new mongoose.Types.ObjectId(id)});
}
const updatesetting=async(id,body)=>{
    return await settingmodel.findByIdAndUpdate(
        {_id: new mongoose.Types.ObjectId(id)},
        {$set: body},
    );
}

  module.exports={
        addsetting,
        getsetting,
        getsettingbyid,
        detelesetting,
        updatesetting,    
  }