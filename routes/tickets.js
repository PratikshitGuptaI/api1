const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticketController');
const ticketcontroller = new TicketController();

router.get('/scan', ticketcontroller.scanTicket);
router.get('/generate-qr/:quantity',ticketcontroller.generateTicketasync)
router.get('/storeqr/',ticketcontroller.createTicket)
router.get('/list/:bookingId',ticketcontroller.getTicketsUrl)
router.get('/download/qr/',ticketcontroller.downloadTicket)
router.get('/download/qr/folder/',ticketcontroller.downloadTickets)
router.get('/attendance',ticketcontroller.updateAttendance)
// router.get('/home/bottom', cmsController.getHomeBottomSection);

// router.get('/items', invoiceController.getInvoiceItems);
// router.get('/actionsList', moduleController.getModuleActions);


module.exports = router;