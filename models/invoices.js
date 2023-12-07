'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoices extends Model {
    static associate(models) {
      // console.log('Starting Invoices-> Event association setup...');
      invoices.belongsTo(models.Event,{foreignKey:'id'});
      // console.log('Finished Invoices ->Event association setup');
      // console.log('Starting Invoices-> Booking association setup...');
      invoices.belongsTo(models.Booking,{foreignKey:'id'});
      // console.log('Finished Invoices ->Booking association setup');
      // console.log('Starting Invoices-> BookingTransaction association setup...');
      invoices.belongsTo(models.BookingTransaction,{foreignKey:'id'});
      // console.log('Finished Invoices ->BookingTransaction association setup');
      // console.log('Starting Invoices-> InvoiceItems association setup...');
      invoices.hasMany(models.InvoiceItems,{foreignKey:'invoice_id'})
      // console.log('Finished Invoices ->InvoiceItems association setup');
    }
  }
  invoices.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    increment_id: {type:DataTypes.STRING,allowNull:true},
    event_id: {type:DataTypes.INTEGER,allowNull:false},
    email_sent: {type:DataTypes.INTEGER,allowNull:true,defaultValue:0},
    total_qty: {type:DataTypes.INTEGER,allowNull:true},
    sub_total: {type:DataTypes.DECIMAL(12,4),defaultValue:0.0000},
    grand_total: {type:DataTypes.DECIMAL(12,4),defaultValue:0.0000},
    tax_amount: {type:DataTypes.DECIMAL(12,4),defaultValue:0.0000},
    discount_amount: {type:DataTypes.DECIMAL(12,4),defaultValue:0.0000},
    booking_id: {type:DataTypes.INTEGER.UNSIGNED,allowNull:true},
    created_at: {type:DataTypes.DATE,allowNull:true,defaultValue:Sequelize.fn('NOW')},
    updated_at: {type:DataTypes.DATE,allowNull:true,defaultValue:Sequelize.fn('NOW')},
    transaction_id: {type:DataTypes.STRING,allowNull:true},
    reminders: {type:DataTypes.INTEGER,allowNull:false,defaultValue:0},
    next_reminder_at: {type:DataTypes.DATE,allowNull:true,defaultValue:Sequelize.fn('NOW')}
  }, {
    sequelize,
    modelName: 'invoices',
    timestamps:false
  });
  return invoices;
};