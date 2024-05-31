const mongoose=require('mongoose');
const contractmodel=require('../../model/booking/contract.model');

const addcontract=async(body)=>{
    body.fee=body.charging*0.1;
    const contract=await contractmodel.create(body);
    return contract;
}
const getcontract=async()=>{ 
   return await contractmodel.find();
}
const getcontractbyid=async(id)=>{
    return await contractmodel.findById(id).exec();
}
const detelecontract=async(id)=>{
    return await contractmodel.deleteOne({_id: new mongoose.Types.ObjectId(id)});
}
const updatecontract=async(id,body)=>{
    return await contractmodel.findByIdAndUpdate(
        {_id: new mongoose.Types.ObjectId(id)},
        {$set: body},
    );
}
const getcontractbysalerID=async(ID)=>{
    return await contractmodel.find({salerID:ID}).exec();
}
const getcontractbyuserID=async(ID)=>{
    return await contractmodel.find({userID:ID}).exec();
}
const getStatusCounts = async () => {
    const items = await contractmodel.find({});
    const statusCounts = {
      All: items.length,
      Active: items.filter((item) => item.status === 'active').length,
      Inactive: items.filter((item) => item.status === 'inactive').length,
    };
    return statusCounts;
  };
  module.exports={
        addcontract,
        getcontract,
        getcontractbyid,
        detelecontract,
        updatecontract,
        getStatusCounts,
        getcontractbysalerID,
        getcontractbyuserID,
  }
