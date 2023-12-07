const sequelize = require('../config/db')
const invoice = sequelize.Invoices;
const invoiceItems = sequelize.InvoiceItems;

class InvoiceRepo{

async getInvoices(){
    const invoices = await invoice.findAll();
    return invoices;
}

async getInvoiceItems(id){
        const invoiceId = id;
      const role = await invoiceItems.findAll({
      where: {
        invoice_id:invoiceId
      }
        });
        return role;
  }
}

module.exports = InvoiceRepo;