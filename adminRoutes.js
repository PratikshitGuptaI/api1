const express = require('express');
const multer = require('multer');
const app = express();
const ftpFolder = require('./config/ftp-folder.json')
const userRoutes = require('./routes/user.js');
const eventRoutes = require('./routes/event.js');
const offerRoutes = require('./routes/offer.js');
const orderRoutes = require('./routes/order.js');
const rolesRoutes = require('./routes/roles.js');
const modulesRoutes = require('./routes/module.js');
const invoiceRoutes = require('./routes/invoice.js');
const cmsRoutes = require('./routes/cms.js');
const vendorRoutes = require('./routes/vendor.js');
const devicesRoutes = require('./routes/devices.js');
const mailRoutes = require('./routes/mail.js');
const verifyRoutes = require('./routes/verifyRoutes.js');
const adminAuthMiddleware = require('./middleware/auth.js');
const path = require('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // const folder = req.body.folder || '';
      const uploadPath = path.join(__dirname, 'uploads', ftpFolder['ftp-banner']);
      console.log(uploadPath);
      cb(null, uploadPath); // Upload folder
      // cb(null, 'uploads/'); // Upload folder
    },
    filename: (req, file, cb) => {
      const fileName = Date.now() + path.extname(file.originalname);
      cb(null, fileName);
    },
  });
const QRCODE = multer.diskStorage({
    destination: (req, file, cb) => {
      // const folder = req.body.folder || '';
      const uploadPath = path.join(__dirname, 'uploads', ftpFolder['ftp-qr']);
      console.log(uploadPath);
      cb(null, uploadPath); // Upload folder
      // cb(null, 'uploads/'); // Upload folder
    },
    filename: (req, file, cb) => {
      const fileName = Date.now() + path.extname(file.originalname);
      cb(null, fileName);
    },
  });
const speaker = multer.diskStorage({
    destination: (req, file, cb) => {
      // const folder = req.body.folder || '';
      const uploadPath = path.join(__dirname, 'uploads', ftpFolder['ftp-speaker']);
      console.log(uploadPath);
      cb(null, uploadPath); // Upload folder
      // cb(null, 'uploads/'); // Upload folder
    },
    filename: (req, file, cb) => {
      const fileName = Date.now() + path.extname(file.originalname);
      cb(null, fileName);
    },
  });
const paymentQR = multer.diskStorage({
    destination: (req, file, cb) => {
      // const folder = req.body.folder || '';
      const uploadPath = path.join(__dirname, 'uploads', ftpFolder['ftp-payment-qr']);
      console.log(uploadPath);
      cb(null, uploadPath); // Upload folder
      // cb(null, 'uploads/'); // Upload folder
    },
    filename: (req, file, cb) => {
      const fileName = Date.now() + path.extname(file.originalname);
      cb(null, fileName);
    },
  });
const paymentProof = multer.diskStorage({
    destination: (req, file, cb) => {
      // const folder = req.body.folder || '';
      const uploadPath = path.join(__dirname, 'uploads', ftpFolder['ftp-payment-proof']);
      console.log(uploadPath);
      cb(null, uploadPath); // Upload folder
      // cb(null, 'uploads/'); // Upload folder
    },
    filename: (req, file, cb) => {
      const fileName = Date.now() + path.extname(file.originalname);
      cb(null, fileName);
    },
  });

const uploadBanner = multer({ storage:storage });
const uploadPaymentQR = multer({ storage : paymentQR});
const uploadPaymentProof = multer({ storage : paymentProof});
const uploadTicketQR = multer({ storage : QRCODE});
const uploadEventSpeaker = multer({ storage : speaker});
  

// app.use('/user', userRoutes);
app.use('/user', userRoutes);
app.use('/role', adminAuthMiddleware,rolesRoutes);
app.use('/vendor',     adminAuthMiddleware,vendorRoutes);
app.use('/module',adminAuthMiddleware, modulesRoutes);
app.use('/event', adminAuthMiddleware,eventRoutes);
app.use('/offer',   adminAuthMiddleware,offerRoutes);
app.use('/orders',   adminAuthMiddleware,orderRoutes);
app.use('/invoices', adminAuthMiddleware,invoiceRoutes);
app.use('/cms',     adminAuthMiddleware,cmsRoutes);
app.use('/devices',devicesRoutes);
app.use('/verify',     adminAuthMiddleware,verifyRoutes);
app.use('/password/reset',mailRoutes)
app.post('/upload/tickets/qr', uploadTicketQR.single('photo'), (req, res) => {
    if (req.file) {
      const fileUrl = `/uploads/${ftpFolder['ftp-qr']}/${req.file.filename}`;
      const sendUrl = `uploads/${ftpFolder['ftp-qr']}/${req.file.filename}`;
      console.log('Upload Image: '+__dirname+fileUrl)
      return res.json({ __dirname,sendUrl });
    } else {
      return res.status(500).json({ error: 'File upload failed' });
    }
  });
app.post('/upload/payment/qr', uploadPaymentQR.single('photo'), (req, res) => {
    if (req.file) {
      const fileUrl = `/uploads/${ftpFolder['ftp-payment-qr']}/${req.file.filename}`;
      const sendUrl = `uploads/${ftpFolder['ftp-payment-qr']}/${req.file.filename}`;
      console.log('Upload Image: '+__dirname+fileUrl)
      return res.json({ __dirname,sendUrl });
    } else {
      return res.status(500).json({ error: 'File upload failed' });
    }
  });
app.post('/upload/payment/proof', uploadPaymentProof.single('photo'), (req, res) => {
    if (req.file) {
      const fileUrl = `/uploads/${ftpFolder['ftp-payment-proof']}/${req.file.filename}`;
      const sendUrl = `uploads/${ftpFolder['ftp-payment-proof']}/${req.file.filename}`;
      console.log('Upload Image: '+__dirname+fileUrl)
      return res.json({ __dirname,sendUrl });
    } else {
      return res.status(500).json({ error: 'File upload failed' });
    }
  });
app.post('/upload/speaker', uploadEventSpeaker.single('photo'), (req, res) => {
    if (req.file) {
      const fileUrl = `/uploads/${ftpFolder['ftp-speaker']}/${req.file.filename}`;
      const sendUrl = `uploads/${ftpFolder['ftp-speaker']}/${req.file.filename}`;
      console.log('Upload Image: '+__dirname+fileUrl)
      return res.json({ __dirname,sendUrl });
    } else {
      return res.status(500).json({ error: 'File upload failed' });
    }
  });
app.post('/upload', uploadBanner.single('photo'), (req, res) => {
    if (req.file) {
      const fileUrl = `/uploads/${ftpFolder['ftp-banner']}/${req.file.filename}`;
      const sendUrl = `uploads/${ftpFolder['ftp-banner']}/${req.file.filename}`;
      console.log('Upload Image: '+__dirname+fileUrl)
      return res.json({ __dirname,sendUrl });
    } else {
      return res.status(500).json({ error: 'File upload failed' });
    }
  });
module.exports = app;