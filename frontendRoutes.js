const express = require('express');
const fs = require('fs');
const path = require('path');
const UserController = require('./controllers/userController');
const userController = new UserController();
const app = express();
const eventRoutes = require('./routes/event');
const cmsRoutes = require('./routes/cms');
const paymentRoutes = require('./routes/payment');
const ticketsRoutes = require('./routes/tickets');
const vendorRoutes = require('./routes/vendor');
const verifyRoutes = require('./routes/verifyRoutes');


app.use('/event', eventRoutes);
app.use('/cms', cmsRoutes);
app.use('/ticket',ticketsRoutes) 
app.use('/vendor',vendorRoutes) 
app.use('/payment',paymentRoutes) 
app.get('/usersList',userController.getUserById);
app.get('/verify',verifyRoutes)
// app.get('/download', (req, res) => {
//     const folderPath = path.join(__dirname, 'uploads/banners'); // Change 'api_directory' to your folder name
//     const files = fs.readdirSync(folderPath);
  
//     // Set response headers
//     res.setHeader('Content-Type', 'application/octet-stream');
  
//     // Stream each file to the response
//     files.forEach((file) => {
//       const filePath = path.join(folderPath, file);
//       const fileStream = fs.createReadStream(filePath);
      
//       // Set the file name in the response header
//       res.setHeader('Content-Disposition', `attachment; filename=${file}`);
      
//       // Pipe the file stream to the response
//       fileStream.pipe(res);
//     });
//   });
app.get('/download', (req, res) => {
    const folderPath = path.join(__dirname, 'uploads/banners'); // Change 'api-directory' to your actual folder name
    fs.readdir(folderPath, (err, files) => {
        if (err) {
          console.error('Error reading folder:', err);
          return res.status(500).send('Internal Server Error');
        }
    
        // Set the response headers for file downloading
        res.setHeader('Content-Type', 'application/octet-stream');
    
        // Create a writable stream for the response
        const downloadStream = res;
    
        // Stream each file to the client
        function streamFile(index) {
          if (index === files.length) {
            // End the response after all files are streamed
            res.end();
            console.log('All files streamed successfully.');
            return;
          }
    
          const file = files[index];
          const filePath = path.join(folderPath, file);
          const fileStream = fs.createReadStream(filePath);
    
          fileStream.on('error', (err) => {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
          });
    
          fileStream.pipe(downloadStream, { end: false });
    
          fileStream.on('end', () => {
            // Do something after each file is streamed (optional)
            console.log(`File "${file}" streamed successfully.`);
            streamFile(index + 1);
          });
        }
    
        // Start streaming files
        streamFile(0);
      });
    });
    
  
// app.put('')
// app.put('/attendance',userController.approveEvent)

module.exports = app;
