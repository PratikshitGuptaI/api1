const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const orderController = new OrderController();

router.get('/', orderController.getOrders);
// router.get('/items', orderController.getInvoiceItems);

// router.get('/items', invoiceController.getInvoiceItems);
// router.get('/actionsList', moduleController.getModuleActions);


module.exports = router;