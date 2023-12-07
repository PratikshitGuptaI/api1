const OrderRepo = require('../repo/order-repo');
const orderrepo = new OrderRepo();

class OrderController{

async getOrders(req,res){
    try{
        const orders = await orderrepo.getOrders()
        if(!orders){
            return res.status(200).json({result:'No Orders Found'});
          }
          else{
            return res.status(200).json({result:orders});
          }
        }
        catch(error){
          console.error(error);
          // res.status(500).json({ error: 'Internal Server Error' });
          return res.status(400).json({ message: error.message });
        }

}
// async getInvoiceItems(req,res){
//   try{
//     const InvoiceId = req.body.invoiceId;
//     const items = await invoicerepo.getInvoiceItems(InvoiceId);
//     if(!items || items.length ==0){
//         return res.status(200).json({result:'No Invoices Found'});
//       }
//       else{
//         return res.status(200).json({result:items});
//       }
//     }
//     catch(error){
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//       res.status(400).json({ message: error.message });
//     }
// }
}
module.exports = OrderController;