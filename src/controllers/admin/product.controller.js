
const path=require('path');
const {
  addproduct,
  getproduct,
  getproductbyid,
  deleteproduct,
  updateproduct,
  getStatusCounts,
} = require("../../services/admin/product.service");
const {
  getuserbyid,
}=require('../../services/admin/user.service');
const { imageHelper } = require("../../helper/news.helper");
const { body, validationResult } = require("express-validator");
const mainName = 'product';
const linkprefix = `/admin/${mainName}/`;

class productController {

  getAll = async (req, res, next) => {
    let { status } = req.params;
    let keyword = req.query.keywords;
    console.log(status);
    let data;
    const statusCounts = await getStatusCounts();

    if (status) {
      data = await getproduct(status, keyword);
      console.log(data);
    } else {
      data = await getproduct();
    }
    data.sort((a, b) => a.ordering - b.ordering);

    res.render("admin/product", { data, statusfilter: this.getStatusFilter(statusCounts, status), keyword, linkprefix });
};


  getForm = async (req, res, next) => {
    let { id } = req.params;
    if (id == "") {
      res.render("admin/product/form");
    } else {
      const data = await getproductbyid(id);
      const saler=await getuserbyid(data.salerID);
      res.render("admin/product/form", { data:data, saler:saler });
    }
  };

  addOrUpdateItem = async (req, res) => {
    const { id } = req.body;
 
  
    try {
      if (id) {
        await updateproduct(id, req.body);
        req.flash("success", "Update item thành công", false);
      } else {
        await addproduct(req.body);
        req.flash("success", "Add item thành công", false);
      }
      res.redirect(`${linkprefix}all`);
    } catch (error) {
      console.error('Error processing form:', error);
      req.flash("danger", "An error occurred", false);
      res.redirect(`${linkprefix}all`);
    }
  };
  
  
  imageUpload = async (req, res, next) => {
    const { id } = req.params;
  
    if (!id) {
      req.flash("danger", "Invalid operation", false);
      return res.redirect(`${linkprefix}all`);
    }
  
    imageHelper('image')(req, res, async (err) => {
      try {
        const filePath = path.join(req.file.filename);
        req.body.file = filePath;
  
        await updateproduct(id, { image: filePath });
  
        req.flash("success", "Update image thành công", false);
        res.redirect(`${linkprefix}all`);
      } catch (error) {
        console.error('Error processing form:', error);
        req.flash("danger", "An error occurred", false);
        res.redirect(`${linkprefix}all`);
      }
    });
  };
  
  dropzoneUpload = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        req.flash("danger", "Invalid operation", false);
        return res.redirect(`${linkprefix}all`);
    }
    console.log(req.files);
   
  
    try {
        // Check if files are present in the request
        if (!req.files || req.files.length === 0) {
            req.flash("danger", "No files were uploaded", false);
            return res.redirect(`${linkprefix}all`);
        }
        
        // Process each uploaded file
        req.files.forEach(async (file) => {
          console.log("Uploaded file:", file.filename);
          const filePath = path.join(file.filename);
          console.log(filePath);
          const newListImage = { Image: filePath };
          const item = await getproductbyid(id);
          item.List.push(newListImage);
          await item.save();
      });
  
        req.flash("success", "Files uploaded successfully", false);
        res.redirect(`${linkprefix}all`);
    } catch (error) {
        console.error('Error processing uploaded files:', error);
        req.flash("danger", "An error occurred while processing files", false);
        res.redirect(`${linkprefix}all`);
    }
  };
  
  deleteImage = async (req, res, next) => {
    try {
        const { itemId, imageId } = req.params;
        console.log(itemId, imageId);
        const item = await getproductbyid(itemId);
        if (!item) {
            req.flash("danger", "Item not found", false);
            return res.redirect(`${linkprefix}all`);
        }
        const imageIndex = item.List.findIndex(image => image._id.toString() === imageId);
        if (imageIndex === -1) {
            req.flash("danger", "Image not found", false);
            return res.redirect(`${linkprefix}all`);
        }
        item.List.splice(imageIndex, 1);
        await item.save();
  
        req.flash("success", "Image deleted successfully", false);
        res.redirect(`${linkprefix}all`);
    } catch (error) {
        console.error('Error deleting image:', error);
        req.flash("danger", "An error occurred while deleting the image", false);
        res.redirect(`${linkprefix}all`);
    }
  };

  deleteItem = async (req, res, next) => {
    try {
      let { id } = req.params;
      console.log('deleteItem', id);
      // return;
      await deleteproduct(id);
      req.flash("success", "Delete item thành công", false);
      res.redirect(`${linkprefix}all`);
    } catch (error) {
      console.error('Error deleting item:', error);
      req.flash("danger", "An error occurred while deleting the item", false);
      res.redirect(`${linkprefix}all`);
    }
  };


  statusCount = async (req, res, next) => {
    try {
      const items = await getproduct();
      const statusCounts = await getStatusCounts();

 let status = req.params.status ;
const updatestatusfilter=this.getStatusFilter(statusCounts,status);
status=status||'all';

console.log(status);

      res.render('list', {
        items,
        statusfilter: updatestatusfilter,
        calculateItemCount: this.calculateItemCount,
      });
    } catch (err) {
      console.error('Error fetching items:', err);
      res.status(500).send('Internal Server Error');
    }
  };

  getStatusFilter = (statusCounts, currentStatus) => [
    {
      name: 'All',
      count: statusCounts.All,
      link: currentStatus === 'all' ? 'all' : `${linkprefix}all`,
      class: currentStatus === 'all' ? 'btn m-b-sm btn-success btn-sm' : 'btn m-b-sm default',
    },
    {
      name: 'Active',
      count: statusCounts.Active,
      link: currentStatus === 'active' ? 'active' : `${linkprefix}active`,
      class: currentStatus === 'active' ? 'btn m-b-sm btn-success btn-sm' : 'btn m-b-sm default',
    },
    {
      name: 'Inactive',
      count: statusCounts.Inactive,
      link: currentStatus === 'inactive' ? 'inactive' : `${linkprefix}inactive`,
      class: currentStatus === 'inactive' ? 'btn m-b-sm btn-success btn-sm' : 'btn m-b-sm default',
    },
  ];
  

  calculateItemCount = (itemName, items) => {
    switch (itemName) {
      case 'All':
        return items.length;
      case 'Active':
        return items.filter((item) => item.status === 'active').length;
      case 'Inactive':
        return items.filter((item) => item.status === 'inactive').length;
      default:
        return 0;
    }
  };

  updateStatus = async (req, res, next) => {
    try {
      const { id, status } = req.params;
      const producttatus = status === 'active' ? 'inactive' : 'active';
      await updateproduct(id, { status: producttatus });
      res.status(200).json({ message: 'Successfully updated status', id, status: producttatus });
    } catch (error) {
      console.error("Error during status update:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
};

statusTool = async (req, res, next) => {
  const { action, selectedItems } = req.body;
  let producttatus;
  
  switch (action) {
    case 'set_to_active':
      producttatus = 'active';
      break;
    case 'set_to_inactive':
      producttatus = 'inactive';
      break;
    case 'set_to_delete':
      for (const itemId of selectedItems) {
        await deleteproduct(itemId);
      }
      // setFlashMessage(req, 'success', 'Delete item thành công');
      res.json({ success: true });
      return;
    default:
      return res.status(400).json({ error: 'Invalid action' });
  }

  if (producttatus && (producttatus === 'active' || producttatus === 'inactive')) {
    for (const itemId of selectedItems) {
      await updateproduct(itemId, { status: producttatus });
    }
    // setFlashMessage(req, 'success', 'Update item thành công');
    res.json({ success: true });
    return;
  }

  // res.redirect(`${linkprefix}`);

};

}


module.exports = new productController();