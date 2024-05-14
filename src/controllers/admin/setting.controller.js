const {
    addsetting,
    getsetting,
    getsettingbyid,
    detelesetting,
    updatesetting,
} =require('../../services/admin/setting.service');

const path=require('path');
const { imageHelper } = require("../../helper/news.helper");
const mainName = 'setting';
const linkprefix = `/admin/${mainName}/`;



class settingcontroller{
    getAll = async ( req , res , next) => {
        let data=await getsetting();
          res.render('admin/setting',{data});
      }
      getForm = async (req, res, next) => {
          let { id } = req.params;
          if (id == "") {
            res.render("admin/setting/form");
          } else {
            let data = await getsettingbyid(id);
            res.render("admin/setting/form", { data });
          }
      }
      addOrUpdateItem = async (req, res) => {
        console.log(req.body);
        const { id } = req.params;
        try {
          if (id) {
            console.log('Willing update data!')
            await updatesetting(id, req.body);
            req.flash("success", "Update item thành công", false);
          } else {
            await addsetting(req.body);
            req.flash("success", "Add item thành công", false);
          }
          res.redirect(`${linkprefix}`);
        } catch (error) {
          console.error('Error processing form:', error);
          req.flash("danger", "An error occurred", false);
          res.redirect(`${linkprefix}`);
        }
      };
      imageUpload = async (req, res, next) => {
        const { id } = req.params;
      
        if (!id) {
          req.flash("danger", "Invalid operation", false);
          return res.redirect(`${linkprefix}`);
        }
      
        imageHelper(req, res, async (err) => {
          try {
            const filePath = path.join(req.file.filename);
            req.body.file = filePath;
      
            await updatesetting(id, { avatar: filePath });
      
            req.flash("success", "Update image thành công", false);
            res.redirect(`${linkprefix}`);
          } catch (error) {
            console.error('Error processing form:', error);
            req.flash("danger", "An error occurred", false);
            res.redirect(`${linkprefix}`);
          }
        });
      };
      deleteItem = async (req, res, next) => {
        let { id } = req.params;
        await detelesetting(id);
        req.flash("success", "Delete item thành công", false);
        res.redirect(`${linkprefix}all`);
      };
}
module.exports = new settingcontroller();