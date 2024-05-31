const mongoose = require('mongoose');
const productmodel = require('../../model/booking/product.model');

const addproduct = async (body) => {
  const product = await productmodel.create(body);
  return product._id;
}
const getproduct = (status, keyword) => {
  let query = {};
  //console.log(keyword);
  if (status === 'all') {
    query = {};
  } else if (status) {
    query.status = status;
  }
  if (keyword) {
    query.$or = [
      { name: new RegExp(keyword, 'i') },
      { description: new RegExp(keyword, 'i') },
      { 'productinformation.brand': new RegExp(keyword, 'i') },
    ];
  }
  return productmodel.find(query); // remove the await here
}
const getproductbysalerID = async (ID) => {
  return await productmodel.find({ salerID: ID }).exec();
}
const getproductbyid = async (id) => {
  return await productmodel.findById(id).exec();
}
const deleteproduct = async (id) => {
  return await productmodel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
}
const updateproduct = async (id, body) => {
  return await productmodel.findByIdAndUpdate(
    { _id: new mongoose.Types.ObjectId(id) },
    { $set: body },
  );
}
const updateState = async (id, state) => {
  try {
  return await productmodel.findByIdAndUpdate(
    id,
    { $set: { hireState: state } },
    { new: true },
  );
} catch (error) {
  console.error(error);
}
}
const getStatusCounts = async () => {
  const items = await productmodel.find({});
  const statusCounts = {
    All: items.length,
    Active: items.filter((item) => item.status === 'active').length,
    Inactive: items.filter((item) => item.status === 'inactive').length,
  };
  return statusCounts;
};


module.exports = {
  addproduct,
  getproduct,
  getproductbyid,
  deleteproduct,
  updateproduct,
  getStatusCounts,
  getproductbysalerID,
  updateState,
}