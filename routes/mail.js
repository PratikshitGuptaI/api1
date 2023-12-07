const express = require('express');
const router = express.Router();
const MailController = require('../controllers/mailController');
const mailcontroller = new MailController();

router.post('/mail/:userId',mailcontroller.sendResetPasswordMail);
// router.get('/mail', mailcontroller.sendResetPasswordMail);
// router.get('/:userId/:tokenId', mailcontroller.sendResetPasswordMail);
// router.get('/items', invoiceController.getInvoiceItems);
// router.get('/actionsList', moduleController.getModuleActions);


module.exports = router;