const sequelize = require('../config/db')
const offerRules = sequelize.OfferRules;
class offerRepo{
    async getOffers(){
        const offers = await offerRules.findAll();
        return offers;
    }
    async createOffer(){
        const excludedKeys = ['id'];
      // const excludedKeys = ['id', 'created_at', 'updated_at'];
      const allowedFields = await Object.keys(offerRules.getAttributes()).filter(allowedFields => !excludedKeys.includes(allowedFields));
      const eventDaysAndSpeakers = req.body.event_days_and_speakers;
      const sanitizedData = {};
      for (const key of allowedFields) {
        if (req.body[key] !== undefined) {
          sanitizedData[key] = req.body[key];
        }
      }
      // console.log(sanitizedData);
      const offers = await offerRules.create(sanitizedData)
    }
    async updateOffer(){
        const excludedKeys = ['id'];
      // const excludedKeys = ['id', 'created_at', 'updated_at'];
      const allowedFields = await Object.keys(offerRules.getAttributes()).filter(allowedFields => !excludedKeys.includes(allowedFields));
      const eventDaysAndSpeakers = req.body.event_days_and_speakers;
      const sanitizedData = {};
      for (const key of allowedFields) {
        if (req.body[key] !== undefined) {
          sanitizedData[key] = req.body[key];
        }
      }
      // console.log(sanitizedData);
      const offers = await offerRules.update(sanitizedData)
    }
}
module.exports = offerRepo;