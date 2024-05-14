const mongoose=require('mongoose');
const leastmodel=require('../../model/booking/least.model');

const addleast=async(body)=>{
    return await leastmodel.create(body);
}
const getleast=async()=>{ 
   return await leastmodel.find();
}
const getleastbyid=async(id)=>{
    return await leastmodel.findById(id).exec();
}
const deteleleast=async(id)=>{
    return await leastmodel.deleteOne({_id: new mongoose.Types.ObjectId(id)});
}
const updateleast=async(id,body)=>{
    return await leastmodel.findByIdAndUpdate(
        {_id: new mongoose.Types.ObjectId(id)},
        {$set: body},
    );
}
const getStatusCounts = async () => {
    const items = await leastmodel.find({});
    const statusCounts = {
      All: items.length,
      Active: items.filter((item) => item.status === 'active').length,
      Inactive: items.filter((item) => item.status === 'inactive').length,
    };
    return statusCounts;
  };
  module.exports={
        addleast,
        getleast,
        getleastbyid,
        deteleleast,
        updateleast,
        getStatusCounts,
  }