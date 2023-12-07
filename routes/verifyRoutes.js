const express = require('express');
const router = express.Router();
const MailController = require('../controllers/mailController');
const mailcontroller = new MailController();
const jwt = require('jsonwebtoken')
// router.get('/mail', mailcontroller.sendResetPasswordMail);
// router.get('/:userId/:tokenId', mailcontroller.sendResetPasswordMail);
// router.get('/items', invoiceController.getInvoiceItems);
// router.get('/actionsList', moduleController.getModuleActions);
router.get('/token', async (req,res)=>{
    return res.json({result:'CHECKED'});
} )
router.get('/reset', async (req,res)=>{
    try{
        const tokenwithperiods = req.body.token;
        const token =tokenwithperiods.replace(/_/g, '.');
        jwt.verify(token, 'your_secret_key', (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Failed to authenticate token' + err });
            }
    
            // Check if the token has expired
            const currentTimestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp
            if (decoded.exp <= currentTimestamp) {
                console.log('Now Jwt is expired');
                return res.status(401).json({ message: 'Token has expired' });
            }
            else{
                return res.json({result:'Token has not expired'});

            }
    
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({error:error.message});
    }
} )
module.exports = router;