const express = require('express');
const router = express.Router();
const ftpFolder = require('../config/ftp-folder.json')
// const RoleController = require('../controllers/roleController');
// const roleController = new RoleController();
const multer = require('multer');
const path = require('path');

const banner = multer.diskStorage({
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
const qr = multer.diskStorage({
    destination: (req, file, cb) => {
      // const folder = req.body.folder || '';
      const uploadPath = path.join(__dirname, 'uploads', ftpFolder['ftp-payment-qr']);
      console.log(uploadPath);
      cb(null, uploadPath); 
      console.log('DONE');
      // Upload folder
      // cb(null, 'uploads/'); // Upload folder
    },
    filename: (req, file, cb) => {
      const fileName = Date.now() + path.extname(file.originalname);
      cb(null, fileName);
    },
  });

const uploadBanner = multer({ banner });
const uploadSpeaker = multer({ speaker });
const uploadqr = multer({ qr });
  
//role
// router.get('/list', roleController.getRoles);

// router.post('/payment/qr', uploadqr.single('photo'), (req, res) => {
//     if (req.file) {
//       console.log(req.file.filename)
//       console.log(req.file.originalname)
//       const fileUrl = `/uploads/${ftpFolder['ftp-payment-qr']}/${req.file.originalname}`;
//       const sendUrl = `uploads/${ftpFolder['ftp-payment-qr']}/${req.file.originalname}`;
//       console.log('Upload Image: '+__dirname+fileUrl)
//       return res.json({ __dirname,sendUrl });
//     } else {
//         return res.status(500).json({ error: 'Speaker File upload failed' });
//     }
// });
// router.post('/speaker', uploadSpeaker.single('photo'), (req, res) => {
//     if (req.file) {
//       const fileUrl = `/uploads/${ftpFolder['ftp-speaker']}/${req.file.filename}`;
//       const sendUrl = `uploads/${ftpFolder['ftp-speaker']}/${req.file.filename}`;
//       console.log('Upload Image: '+__dirname+fileUrl)
//       return res.json({ __dirname,sendUrl });
//     } else {
//         return res.status(500).json({ error: 'Speaker File upload failed' });
//     }
// });
// router.post('/', uploadBanner.single('photo'), (req, res) => {
//     if (req.file) {
//       const fileUrl = `/uploads/${ftpFolder['ftp-banner']}/${req.file.filename}`;
//       const sendUrl = `uploads/${ftpFolder['ftp-banner']}/${req.file.filename}`;
//       console.log('Upload Image: '+__dirname+fileUrl)
//       return res.json({ __dirname,sendUrl });
//     } else {
//       return res.status(500).json({ error: 'File upload failed' });
//     }
//   });
module.exports = router;
