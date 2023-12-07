const VendorRepo = require('../repo/vendor-repo');
const vendorrepo = new VendorRepo();

class InvoiceController{

async createRequest(req,res){
    try{
        const booking_id = req.body.booking_id;
        const proof_url = req.body.proofLink;
        const otp = await vendorrepo.generateRandomOtp();
        const request = await vendorrepo.createRequest(booking_id,proof_url,otp);
        if(!request){
            return res.status(200).json({result:'No Invoices Found',status:0});
          }
          else{
            return res.status(200).json({result:request,status:1,otp:otp});
          }
        }
        catch(error){
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
          res.status(400).json({ message: error.message });
        }

}
async getRequests(req,res){
  try{
    // const InvoiceId = req.body.invoiceId;
    const items = await vendorrepo.getRequests();
    if(!items || items.length ==0){
        return res.status(200).json({result:'No Invoices Found',status:0});
      }
      else{
        return res.status(200).json({result:items,status:1});
      }
    }
    catch(error){
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
      res.status(400).json({ message: error.message });
    }
}
async confirmRequest(req,res){
  try{
    const id = req.body.id;
    const request = await vendorrepo.confirmRequest(id);
    if(!request || request.length ==0){
        return res.status(200).json({result:'Not Updated',status:0});
      }
      else{
        return res.status(200).json({result:request,status:1});
      }

  }catch(error){
    console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
      res.status(400).json({ message: error.message });
  }
}
}
module.exports = InvoiceController;