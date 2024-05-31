const nodemailer = require("nodemailer");
const {
    mailreply,
    contract,
}= require('../../helper/mailreply');
const contactModel=require('../../model/booking/contact.model');
const {
    addcontact,
    getcontact,
    getcontactbyid,
    detelecontact, 
    getStatusCounts,
}=require('../../services/admin/contact.service');

const dotenv = require('dotenv');
dotenv.config();

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
       return res.render('contact');
    }
    sendContactMail = async (req, res, next) => {
        console.log(req.body + req.user._id);
        //return;
        try {
            const { Name, Email, Message,Subject } = req.body;
            const replyContent = mailreply();        
            const mailOptions = {
                from: process.env.GOOGLE_MAIL_USER,
                to: Email,
                subject: `Thank you for your feedback, ${Name}!`, 
                html: `<p>Dear ${Name},</p><p>${replyContent}</p>`, 
            };
            await this.transporter.sendMail(mailOptions);
            await addcontact({ Name, Email, Message,Subject, userID: req.user._id });
            res.redirect('/home');
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } 
    }
}
module.exports=new contactController();