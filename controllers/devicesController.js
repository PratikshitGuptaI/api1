const DevicesRepo = require('../repo/devices-repo');
const devicesRepo = new DevicesRepo();
const getmac = require('getmac');
const os = require('os');
class OfferController {
  async getDevices(req, res) {
    try {
      const devices = await devicesRepo.getDevices();
      // if(!offers || offers.length ==0){
      //   return res.status(200).json({result:'No Offers Found'});
      // }
      // else{
      return res.status(200).json({ result: devices, status: devices });
      // }
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
      // res.status(400).json({ message: error.message });
    }
  }
  async checkUser(req, res) {
    try {
      const secretKey = req.body.secretKey;
      const text = req.body.text;
      const Version = os.version();
      // const Version = req.body.Version;
      const brandmodel = os.platform();
      // const brandmodel = req.body.brandmodel;
      const osvName = os.release();
      // const osvName = req.body.osvName;
      // const MacAddr = getmac.default();
      const MacAddr = getmac.default();
      // const MacAddr = req.body.MacAddr;
      const app_url = req.body.app_url;
      const TokenId = req.params.tokenId;
      // const tokenId = req.body.tokenId;
      const device = await devicesRepo.checkDevice(TokenId);
      const deviceAccess = await devicesRepo.checkDeviceAccess(TokenId);
      if (device == null) {
        try {
          // Call async function 1 from within async function 2
          console.log(MacAddr);
          console.log(Version);
          console.log(brandmodel);
          console.log(osvName);
          const user = await devicesRepo.createDeviceRequest(TokenId,text,MacAddr,osvName,brandmodel,Version,app_url);
      
          // Additional logic for async function 2
          return res.status(200).json({ result: 'Request has been Registered ! Contact Your Administrator to accept Request', user: user });
          // return res.status(200).json({ result: 'Request has been Registered ! Contact Your Administrator to accept Request', user: MacAddr });
          // res.send('Async function 2 completed successfully.');
        } catch (error) {
          // Handle errors
          console.error(error);
          res.status(500).send('Internal Server Error');
        }
        // const user = await this.registerUser(req, res);

      }
      else if (deviceAccess == null) {
          return res.status(200).json({ result: 'Contact Your Administrator to accept Request' });
      }
      else{
        return res.status(200).json({ result: device, status: 1 });
      }
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
      // res.status(400).json({ message: error.message });
    }
  }
  async registerUser(req, res) {
    try {
      const secretKey = req.body.secretKey;
      const text = req.body.text;
      const Version = req.body.Version;
      const brandmodel = req.body.brandmodel;
      const osvName = req.body.osvName;
      // const MacAddr = getmac.default();
      const MacAddr = req.body.MacAddr;
      const app_url = req.body.app_url;
      const TokenId = req.body.tokenId;
      // TokenId,text,MacAddr,osvName,brandmodel,Version,is_accessed,appLoginDate,app_url


      // console.log(MacAddr);
      const devices = await devicesRepo.createDeviceRequest(TokenId,text,MacAddr,osvName,brandmodel,Version,app_url);



      // if(!offers || offers.length ==0){
      //   return res.status(200).json({result:'No Offers Found'});
      // }
      // else{
      return res.status(200).json({ result: devices, status: devices });
      // }
    }
    catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
      // res.status(400).json({ message: error.message });
    }
  }

}

module.exports = OfferController