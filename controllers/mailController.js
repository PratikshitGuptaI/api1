const CmsRepo = require('../repo/cms-repo');
const cmsrepo = new CmsRepo();
const { sendEmail } = require('../middleware/emailUtils.js');
const { User } = require('../config/db');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
class cmsController{
  async sendResetPasswordMail(req,res){
    try{
      // const { userid2,username, password, role,email2,number,firstName } = req.body;
      const userid = req.params.userId;
      // const token = req.body.token;
      const emailUser = await User.findOne({where:{
        userid  : userid
      }})   
      // const token = crypto.randomBytes(32).toString('hex');
      // const expirationTime = Date.now() + 3600000; // Token expires in 1 hour (adjust the time as needed)
      // return { token, expirationTime };
      const token1 = jwt.sign({id: emailUser.id }, 'your_secret_key', { expiresIn: '10h' });
      // const token =encodeURIComponent(token1);
      const token=token1.replace(/\./g, '_');
      console.log(token);
      const email = await emailUser.email;
      const emailSubject = 'Forgot Password ';
      const link = 'http://192.168.29.248:3006/admin/forgot-password/'+userid+"/"+token;
      const emailText = `Hello ${userid},\n Click on the link to Forget Password(This is only Available for 10hrs) :${link}`;
      await sendEmail(email, emailSubject, emailText);
    }
    catch(error){
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
      res.status(400).json({ message: error.message });
    }
  }
}
module.exports = cmsController