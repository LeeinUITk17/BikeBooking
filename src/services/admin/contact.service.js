const mongoose=require('mongoose');
const contactmodel=require('../../model/booking/contact.model');

const addcontact=async(body)=>{
    return await contactmodel.create(body);
}
const getcontact=async()=>{ 
   return await contactmodel.find();
}
const getcontactbyid=async(id)=>{
    return await contactmodel.findById(id).exec();
}
const detelecontact=async(id)=>{
    return await contactmodel.deleteOne({_id: new mongoose.Types.ObjectId(id)});
}

const getStatusCounts = async () => {
    const items = await contactmodel.find({});
    const statusCounts = {
      All: items.length,
      Active: items.filter((item) => item.status === 'active').length,
      Inactive: items.filter((item) => item.status === 'inactive').length,
    };
    return statusCounts;
  };
  module.exports={
        addcontact,
        getcontact,
        getcontactbyid,
        detelecontact, 
        getStatusCounts,
  }