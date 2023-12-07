const PaymentRepo = require('../repo/payment-repo');
const paymentRepo = new PaymentRepo();
const crypto = require('crypto');
const secretKey = 'asdwque%44920764'
class paymentController {
  async createPayment(req, res) {
    try {
      const payment = await paymentRepo.createPayment(req);
      
      // if(!payment){
      //   return res.status(200).json({result:'Could Not Create Payment'});
      // }
      // else{
      // const encryptedId = encryptId(payment, secretKey);
      return res.status(200).json({ result: 'Payment Initialized', booking: payment });
      // async function encryptId(id, key) {
      //   const iv = crypto.randomBytes(16); // Initialization vector
      //   const hash = crypto.createHash('sha256');
      //   hash.update(key);
      //   const key1 = hash.digest();

      //   const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key1), iv);
      //   let encryptedId = cipher.update(id.toString(), 'utf-8', 'hex');
      //   encryptedId += cipher.final('hex');
      //   return { iv: iv.toString('hex'), encryptedId };
      // }
      // }
    }
    catch (error) {
      console.error(error);
      // res.status(500).json({ error: 'Internal Server Error' });
      return res.status(400).json({ message: error.message });
    }
  }

}
module.exports = paymentController