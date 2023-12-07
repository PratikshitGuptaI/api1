const express = require('express');
const router = express.Router();
const InvoiceController = require('../controllers/invoiceController');
const invoiceController = new InvoiceController();

router.get('/', invoiceController.getInvoices);
router.get('/items', invoiceController.getInvoiceItems);

// router.get('/items', invoiceController.getInvoiceItems);
// router.get('/actionsList', moduleController.getModuleActions);


module.exports = router;