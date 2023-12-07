const sequelize = require('../config/db')
const order = sequelize.Booking;
// const invoiceItems = sequelize.InvoiceItems;

class OrderRepo{

async getOrders(){
    const orders = await order.findAll({
        include: sequelize.Event
    });
    return orders;
}

// async getInvoiceItems(id){
//         const invoiceId = id;
//       const role = await invoiceItems.findAll({
//       where: {
//         invoice_id:invoiceId
//       }
//         });
//         return role;
//   }
}

module.exports = OrderRepo;