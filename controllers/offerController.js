const OfferRepo = require('../repo/offer-repo');
const offerRepo = new OfferRepo();

class OfferController{
    async getOffers(req,res){
        try{
        const offers = await offerRepo.getOffers();
        if(!offers || offers.length ==0){
          return res.status(200).json({result:'No Offers Found'});
        }
        else{
          return res.status(200).json({result:offers});
        }
    }
        catch(error){
            console.error(error);
           return res.status(500).json({ error: 'Internal Server Error' });
            // res.status(400).json({ message: error.message });
          }
      }
    async createOffer(req,res){
      try{ 
        const offers = await offerRepo.createOffer(req);
        if(!offers || offers.length ==0){
          return res.status(200).json({result:'No Offers For Creation'});
        }
        else{
          return res.status(200).json({result:offers});
        }

      }catch(error){
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
    async updateOffer(){
      try{
      const offers = await offerRepo.updateOffer(req);
        if(!offers || offers.length ==0){
          return res.status(200).json({result:'No Offers For Updation'});
        }
        else{
          return res.status(200).json({result:offers});
        }

      }catch(error){
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
}

module.exports = OfferController