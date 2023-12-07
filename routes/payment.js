const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');
const paymentcontroller = new PaymentController();

router.post('/',paymentcontroller.createPayment)

module.exports = router;