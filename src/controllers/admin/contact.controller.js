const {
    getcontactbyid
}=require('../../services/admin/contact.service');
const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require("nodemailer");
class contactController{
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GOOGLE_MAIL_USER ,
                pass: process.env.GOOGLE_MAIL_PASSWORDS
            }
        });
    }
    getAll=async(req,res)=>{
       return res.render('admin/contact');
    }
    getForm=async(req,res)=>{
        const {id}=req.params;
        const data=await getcontactbyid(id);
        return res.render('admin/contact/form',{data});
    }
    reply=async(req,res)=>{
        const {id}=req.params;
        // console.log(id);
        // console.log(req.body);
        try {
            const { email, message,subject } = req.body;       
            const mailOptions = {
                from: process.env.GOOGLE_MAIL_USER,
                to: email,
                subject: `${subject} :Reply your feedback, Admin!`, 
                html: `<p>I'm Admin of Easybooking website,</p><p>${message}</p><p>Visit me! https://bikebooking-32lv.onrender.com</p>`, 
            };
            await this.transporter.sendMail(mailOptions);
            const mail=await getcontactbyid(id);
            mail.status='active';
            await mail.save();
            res.redirect('/admin/contact');
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } 
    }
}
module.exports=new contactController();