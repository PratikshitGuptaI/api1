const TicketRepo = require('../repo/ticket-repo');
const ticketrepo = new TicketRepo();
const qr = require('qrcode');
const qrImg = require('qr-image');
const path = require('path')
const fs = require('fs');
const Jimp = require('jimp');
const crypto = require('crypto');
const secretKey = process.env.SECRET_KEY

class ticketController{
  async getTicketsUrl(req,res){
    const bookingId = req.params.bookingId;
    // const decryptedId = decryptId(encryptedId, secretKey);
    const booking = await ticketrepo.ticketsListByBookingId(bookingId)
    console.log(bookingId);
    return res.status(200).json({result:booking});

    // function decryptId(encryptedId, key) {
    //   let iv = Buffer.from(encryptedId.iv, 'hex');
    //   let encryptedText = Buffer.from(encryptedId.encryptedData, 'hex');
    //   let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    //   let decrypted = decipher.update(encryptedText);
    //   decrypted = Buffer.concat([decrypted, decipher.final()]);
    //   return decrypted.toString();
    // }
  }
  async scanTicket(req,res){
    try{
      const incrementId = req.body.incrementId;
      const list = await ticketrepo.scanTicket(incrementId);
      if(!list || list.length ==0){
          return res.status(200).json({result:'No Home Banners Found'});
        }
        else{
          return res.status(200).json({result:list});
        }
      }
      catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        res.status(400).json({ message: error.message });
      }
  }
  async generateTicketasync(req, res){
    const { link } = req.query;
    const {quantity } = req.params;
    try {
      const logoUrl='https://w7.pngwing.com/pngs/817/902/png-transparent-google-logo-google-doodle-google-search-google-company-text-logo-thumbnail.png';
      const logoBuffer = await fetch(logoUrl).then(response => response.buffer());

      const logo = await Jimp.read(logoBuffer);
      logo.resize(50, 50);
      
      const outputPath = './uploads/qr/';
  
      // Compose the images
      if (!link) {
        throw new Error('Link parameter is required.');
      }
      const qrCodeArray =[];
      for (let i = 0; i < 1; i++) {
        // const element = array[i];
        // const qrCode = await qr.toDataURL(link); 
        const qrCode = await qr.toBuffer(link, { errorCorrectionLevel: 'H' });
        // Calculate position to center the logo on the QR code
        const qrImage = await Jimp.read(qrCode);
        const x = (qrCode.width - logo.bitmap.width) / 2;
        const y = (qrCode.height - logo.bitmap.height) / 2;
        qrImage.composite(logo, x, y);
        const resultBuffer = await qrImage.getBufferAsync(Jimp.MIME_PNG);
        const qrImagesave = qrImg.image(resultBuffer, { type: 'png' });
        // const resultImage = new Jimp(qrCode.length, qrCode.length, 0xffffffff); // Set background color (white in this case
        // resultImage.composite(logo, x, y);
        // resultImage.composite(Jimp.read(qrCode), 0, 0);
        qrCodeArray.push(resultBuffer);
        // console.log(qrCode);
        if (!fs.existsSync(outputPath)) {
          fs.mkdirSync(outputPath);
        }
      
        const fileName = `qr-code-${Date.now()}.png`;
        const fileStream = fs.createWriteStream(outputPath + fileName);
      
        qrImage.pipe(fileStream);
      
        // fileStream.on('finish', () => {
        //   res.json({ message: 'QR code generated and saved', qrCodeUrl: `${outputPath}${fileName}` });
        // });
      
        // fileStream.on('error', (err) => {
        //   res.status(500).json({ error: 'Error saving QR code', details: err });
        // });
        res.type('image/png').send(resultBuffer);
    }
    // const qrCode = await qr.toDataURL(link);
    //   console.log(qrCodeArray);
      // res.send({ qrCodeArray });
    //   res.send({ qrCode });
    } catch (error) {
      console.error('Error generating QR code:', error.message);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
  async createTicket(req,res){
    const { targetLink } = req.body;

  if (!targetLink) {
    return res.status(400).json({ error: 'targetLink is required' });
  }

  const qrCodeFile = `qr-code-${Date.now()}.png`;
  const qrCodePath = `./qrcode/${qrCodeFile}`;

  // Generate the QR code
  qr.toFile(qrCodePath, targetLink, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error generating QR code' });
    }

    // Return the path to the stored QR code
    res.json({ qrCodePath });
  });
  }
  async downloadTicket(req,res){
    const { filename } = req.query;

  if (!filename) {
    return res.status(400).json({ error: 'filename is required' });
  }

  const filePath = `./qrCode/${filename}`;

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Use try-catch to handle errors
    try {
      res.download(filePath, filename, (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error downloading the file' });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error downloading the file' });
    }
  } else {
    res.status(404).json({ error: 'File not found' });
  }
  }
  async downloadTickets(req,res){
    // const folderPath = req.query.folderPath;
    const folderPath = './qrCode/';

  if (!folderPath) {
    return res.status(400).json({ error: 'folderPath parameter is required' });
  }

  // Check if the folder exists
  if (!fs.existsSync(folderPath)) {
    return res.status(404).json({ error: 'Folder not found' });
  }

  // Read the contents of the folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading folder contents' });
    }

    // Filter only image files (you can customize this based on your image extensions)
    console.log(files);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|bmp)$/i.test(file));
    if (imageFiles.length === 0) {
      return res.status(404).json({ error: 'No image files found in the folder' });
    }
    console.log(imageFiles);

    // Download all images
    imageFiles.forEach(file => {
      const filePath = path.join(folderPath, file);
      res.download(filePath);
    });
  });
  }
  async updateAttendance(req,res){
    try{
      const sku = req.query.sku;
      console.log(sku)
      const attendance = await ticketrepo.updateAttendance(sku)
      // if(attendance == [1]){
        return res.status(200).json({result:'Updated',attendance:attendance,status:1})
      // }
      // else{
      //   return res.status(200).json({result:'Not Updated'})

      // }
    }catch(error){
      console.log(error);
      return res.status(401).json({error:error.message});
    }
  }
}
module.exports = ticketController