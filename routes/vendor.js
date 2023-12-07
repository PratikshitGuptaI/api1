const express = require('express');
const router = express.Router();
const VendorController = require('../controllers/vendorController');
const vendorController = new VendorController();

router.get('/', vendorController.getRequests);
router.put('/confirm', vendorController.confirmRequest);
router.post('/', vendorController.createRequest);

// router.get('/items', invoiceController.getInvoiceItems);
// router.get('/actionsList', moduleController.getModuleActions);


module.exports = router;