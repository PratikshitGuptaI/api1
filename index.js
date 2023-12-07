const express = require('express');
const adminRoutes = require('./adminRoutes.js');
const frontendRoutes = require('./frontendRoutes.js');
//const logger = require('./startup/logger.js')
const cors =require("cors");
const os = require('os');
//const {apiLogger} = require('./startup/logger.js')
var path = require('path');
const helmet = require('helmet');
helmet({
  crossOriginResourcePolicy: false,
})
const compression = require('compression');
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
// const LOCAL_IP2 = '192.168.1.5';
// const LOCAL_IP = getLocalIpAddress();
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000
// let PORT ;
// = process.env.DEV_PORT || 5173
// process.env.STATUS == 'PRODUCTION'?
// (PORT = process.env.PROD_PORT):(PORT = process.env.DEV_PORT)
// require('./startup/logger.js')(app);
app.disable('x-powered-by');
app.disable('X-Powered-By');
app.use(function (req, res, next) {  
  res.header("x-powered-by", "Blood, sweat, and tears.");
  next();
});
app.use(helmet());
app.use(compression());
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// function getLocalIpAddress() {
//   const interfaces = os.networkInterfaces();
//   for (const key in interfaces) {
//     for (const entry of interfaces[key]) {
//       if (!entry.internal && entry.family === 'IPv4') {
//         return entry.address;
//       }
//     }
//   }
//   return '127.0.0.1';
// }

// apiLogger.info("starting application..");
app.listen(PORT,() => {
    // console.log(`Server is running on port for NETWORK http://${LOCAL_IP}:${PORT}`);
    console.log(`Server is running on port http://localhost:${PORT}`);
    // apiLogger.info(`Listening on port ${PORT}...`)
  });

  // Routes
  app.use('/qrcode/', express.static(path.join(__dirname, 'qrcode')));
  app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));
  app.use('/uploads/qr', express.static(path.join(__dirname, 'uploads/qr')));
  app.use('/uploads/banners', express.static(path.join(__dirname, 'uploads/banners')));
  app.use('/uploads/speakers', express.static(path.join(__dirname, 'uploads/speakers')));
  app.use('/uploads/payment/qr', express.static(path.join(__dirname, 'uploads/payment-qr')));
  app.use('/uploads/payment/screenshot', express.static(path.join(__dirname, 'uploads/payment-screenshot')));
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.use('/admin', adminRoutes);
  app.use('/easyQR',(req,res)=>{

  })
  
app.use('/app', frontendRoutes);
// app.use('/qr', frontendRoutes);
