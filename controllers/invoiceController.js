const InvoiceRepo = require('../repo/invoice-repo');
const invoicerepo = new InvoiceRepo();

class InvoiceController{

async getInvoices(req,res){
    try{
        const invoices = await invoicerepo.getInvoices();
        if(!invoices){
            return res.status(200).json({result:'No Invoices Found'});
          }
          else{
            return res.status(200).json({result:invoices});
          }
        }
        catch(error){
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
          res.status(400).json({ message: error.message });
        }

}
async getInvoiceItems(req,res){
  try{
    const InvoiceId = req.body.invoiceId;
    const items = await invoicerepo.getInvoiceItems(InvoiceId);
    if(!items || items.length ==0){
        return res.status(200).json({result:'No Invoices Found'});
      }
      else{
        return res.status(200).json({result:items});
      }
    }
    catch(error){
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
      res.status(400).json({ message: error.message });
    }
}
}
module.exports = InvoiceController;