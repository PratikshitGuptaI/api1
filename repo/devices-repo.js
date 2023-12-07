const sequelize = require('../config/db')
const devices = sequelize.Devices;
const {Op} = require('sequelize')
class devicesRepo{
    async getDevices(){
        const devicesList = await devices.findAll();
        return devicesList;
    }
    async checkDevice(tokenId){
        const devicesList = await devices.findOne({
          where:{
            TokenId:tokenId  
            // {is_accessed: 1 }]
        }
      });
        return devicesList;
    }
    async checkDeviceAccess(tokenId){
        const devicesList = await devices.findOne({
          where:{
            [Op.and]: [{
            TokenId:tokenId  },
            {is_accessed: 1 }]
            // {is_accessed: 1 }]
        }
      });
        return devicesList;
    }
    async createDeviceRequest(TokenId,text,MacAddr,osvName,brandmodel,Version,app_url){
        const device = await devices.create(
          TokenId,text,MacAddr,osvName,brandmodel,Version,app_url
        );
        return device;
    }
   
}
module.exports = devicesRepo;