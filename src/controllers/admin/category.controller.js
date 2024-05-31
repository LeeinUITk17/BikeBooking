const {
  addItem,
  getItems,
  deleteItem,
  getItemById,
  updateItem,
  getStatusCounts,
} = require("../../services/admin/category.service");
const mainName = 'category';
const linkprefix = `/admin/${mainName}/`;
const cloudinary = require('cloudinary').v2;
const path=require('path');
class categoryController {

  getAll = async (req, res, next) => {
    let { status } = req.params;
    let keyword = req.query.keywords;

    let data;
    const statusCounts = await getStatusCounts();

    if (status) {
      data = await getItems(status, keyword);
    } else {
      data = await getItems();
    }
    data.sort((a, b) => a.ordering - b.ordering);

   return res.render("admin/news/category", { data, statusfilter: this.getStatusFilter(statusCounts, status), keyword, linkprefix });
};
  getForm = async (req, res, next) => {
    let { id } = req.params;
    if (!id) {
       return res.render("admin/news/category/form");
      } else {
        let data = await getItemById(id);
       return res.render("admin/news/category/update", { data });
      }
  };

  addOrUpdateItem = async (req, res) => {
    const { id } = req.params;
    const uploadedFiles = await Promise.all([
        cloudinary.uploader.upload(req.files['avatar'][0].path),
    ]);
    const filePaths = {
        avatar: uploadedFiles[0].secure_url,
    };
    try {
      if (id) {    
        await updateItem(id, { ...req.body, ...filePaths });
        req.flash("success", "Update item thành công", false);
      } else {
        await addItem({ ...req.body, ...filePaths });
        req.flash("success", "Add item thành công", false);
      }
      res.redirect(`${linkprefix}all`);
    } catch (error) {
      console.error('Error processing form:', error);
      req.flash("danger", "An error occurred", false);
      res.redirect(`${linkprefix}all`);
    }
  };
  
  deleteItem = async (req, res, next) => {
    let { id } = req.params;
    await deleteItem(id);
    req.flash("success", "Delete item thành công", false);
    res.redirect(`${linkprefix}`);
  };


  statusCount = async (req, res, next) => {
    try {
      const items = await getItems();
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
      const newStatus = status === 'active' ? 'inactive' : 'active';
      await updateItem(id, { status: newStatus });
      res.status(200).json({ message: 'Successfully updated status', id, status: newStatus });
    } catch (error) {
      console.error("Error during status update:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
};

statusTool = async (req, res, next) => {
  const { action, selectedItems } = req.body;
  let newStatus;
  
  switch (action) {
    case 'set_to_active':
      newStatus = 'active';
      break;
    case 'set_to_inactive':
      newStatus = 'inactive';
      break;
    case 'set_to_delete':
      for (const itemId of selectedItems) {
        await deleteItem(itemId);
      }
      // setFlashMessage(req, 'success', 'Delete item thành công');
      res.json({ success: true });
      return;
    default:
      return res.status(400).json({ error: 'Invalid action' });
  }

  if (newStatus && (newStatus === 'active' || newStatus === 'inactive')) {
    for (const itemId of selectedItems) {
      await updateItem(itemId, { status: newStatus });
    }
    // setFlashMessage(req, 'success', 'Update item thành công');
    res.json({ success: true });
    return;
  }

  // res.redirect(`${linkprefix}`);

};

}


module.exports = new categoryController();