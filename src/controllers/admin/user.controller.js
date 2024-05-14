const {
    adduser,
    getuser,
    getuserbyid,
    deteleuser,
    updateuser,
    getStatusCounts,
} =require('../../services/admin/user.service');
const mainName = 'user';
  const linkprefix = `/admin/${mainName}/`;
  const { imageHelper } = require("../../helper/news.helper");
  const path=require('path');
  const cloudinary = require('cloudinary').v2;
class usercontroller{
    
    getAll = async (req, res, next) => {
        let { status } = req.params;
        let keyword = req.query.keywords;
    
        let data;
        const statusCounts = await getStatusCounts();
    
        if (status) {
          data = await getuser(status, keyword);
        } else {
          data = await getuser();
        }
        data.sort((a, b) => a.ordering - b.ordering);
    
        res.render("admin/user", { data, statusfilter: this.getStatusFilter(statusCounts, status), keyword, linkprefix });
    };
    
    
      getForm = async (req, res, next) => {
        let { id } = req.params;
        if (id == "") {
          res.render("admin/user/form");
        } else {
          let data = await getuserbyid(id);
          res.render("admin/user/form", { data });
        }
      };
      imageUpload = async (req, res, next) => {
        const { id } = req.params;
      
        if (!id) {
          req.flash("danger", "Invalid operation", false);
          return res.redirect(`${linkprefix}all`);
        }
      
        imageHelper('avatar')(req, res, async (err) => {
          try {
            const filePath = path.join(req.file.filename);
            req.body.file = filePath;
      
            await updateuser(id, { avatar: filePath });
      
            req.flash("success", "Update image thành công", false);
            res.redirect(`${linkprefix}all`);
          } catch (error) {
            console.error('Error processing form:', error);
            req.flash("danger", "An error occurred", false);
            res.redirect(`${linkprefix}all`);
          }
        });
      };
      cloudinaryImage=async(req,res,next)=>{
        const { id } = req.params;
        if (!id) {
            console.log('id not found');
            return res.redirect(`${linkprefix}all`);
        }
        try {
            if (!req.file) {
                console.log('No file uploaded');
                return res.render("admin/user/form");
            }
            const result = await cloudinary.uploader.upload(req.file.path);
            await updateuser(id, { avatar: result.secure_url });
            return res.redirect(`${linkprefix}all`);
        } catch (error) {
            console.error('Error processing form:', error);
            return res.render("admin/user/form");
        }
      }
    
      addOrUpdateItem = async (req, res) => {
        const { id } = req.body;
        console.log(req.body);
       // return;
        try {
          if (id) {
            await updateuser(id, req.body);
            req.flash("success", "Update item thành công", false);
          } else {
            await adduser(req.body);
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
        await deteleuser(id);
        req.flash("success", "Delete item thành công", false);
        res.redirect(`${linkprefix}all`);
      };
    
    
      statusCount = async (req, res, next) => {
        try {
          const items = await getuser();
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
          const usertatus = status === 'active' ? 'inactive' : 'active';
          await updateuser(id, { status: usertatus });
          res.status(200).json({ message: 'Successfully updated status', id, status: usertatus });
        } catch (error) {
          console.error("Error during status update:", error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
        
    };
    
    statusTool = async (req, res, next) => {
      console.log("status tool called");
      const { action, selectedItems } = req.body;
      console.log(selectedItems);
      let usertatus;
      
      switch (action) {
        case 'set_to_active':
          usertatus = 'active';
          break;
        case 'set_to_inactive':
          usertatus = 'inactive';
          break;
        case 'set_to_delete':
          for (const itemId of selectedItems) {
            await deleteuser(itemId);
          }
          res.json({ success: true });
          return res.redirect(`${linkprefix}all`);
        default:
          req.flash("danger", "Invalid operation", false);
          return res.redirect(`${linkprefix}all`);
      }
    
      if (usertatus && (usertatus === 'active' || usertatus === 'inactive')) {
        for (const itemId of selectedItems) {
          await updateuser(itemId, { status: usertatus });
        }
        res.json({ success: true });
        return res.redirect(`${linkprefix}all`);
      }

      return res.redirect(`${linkprefix}all`);
    };


}
module.exports=new usercontroller();