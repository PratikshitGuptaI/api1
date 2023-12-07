'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoice_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // console.log('Starting InvoiceItems ->Invoices association setup...');
      invoice_items.belongsTo(models.Invoices,{foreignKey:'id'});
      // console.log('Finished InvoiceItems ->Invoices association setup');
      // console.log('Starting InvoiceItems ->Invoices(Booking) association setup...');
      invoice_items.belongsTo(models.Invoices,{foreignKey:'booking_id'});
      // console.log('Finished InvoiceItems ->Invoices(Booking) association setup');
    }
  }
  // `sku` varchar(191) DEFAULT NULL,
  // `qty` int(11) DEFAULT NULL,
  // `price` decimal(12,4) NOT NULL DEFAULT '0.0000',
  // `total` decimal(12,4) NOT NULL DEFAULT '0.0000',
  // `tax_amount` decimal(12,4) DEFAULT '0.0000',
  // `booking_ticket_id` int(10) UNSIGNED DEFAULT NULL,
  // `invoice_id` int(10) UNSIGNED DEFAULT NULL,
  // `parent_id` int(10) UNSIGNED DEFAULT NULL,
  // `additional` varchar(191) DEFAULT NULL,
  // `created_at` timestamp NULL DEFAULT NULL,
  // `updated_at` timestamp NULL DEFAULT NULL,
  // `discount_percent` decimal(12,4) DEFAULT '0.0000',
  // `discount_amount` decimal(12,4) DEFAULT '0.0000'
  invoice_items.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    sku: {type:DataTypes.STRING,allowNull:true},
    qty:{type:DataTypes.INTEGER,allowNull:true},
    price: {type:DataTypes.DECIMAL(12,4),allowNull:false,defaultValue:0.0000},
    total: {type:DataTypes.DECIMAL(12,4),allowNull:false,defaultValue:0.0000},
    tax_amount: {type:DataTypes.DECIMAL(12,4),allowNull:false,defaultValue:0.0000},
    booking_ticket_id: {type:DataTypes.INTEGER.UNSIGNED,allowNull:true},
    invoice_id: {type:DataTypes.INTEGER.UNSIGNED,allowNull:true},
    parent_id: {type:DataTypes.INTEGER.UNSIGNED,allowNull:true},
    additional: {type:DataTypes.STRING,allowNull:true},
    created_at: {type:DataTypes.DATE,defaultValue:Sequelize.fn('NOW'),allowNull:true},
    updated_at: {type:DataTypes.DATE,defaultValue:Sequelize.fn('NOW'),allowNull:true},
    discount_percent: {type:DataTypes.DECIMAL(12,4),allowNull:false,defaultValue:0.0000},
    discount_amount: {type:DataTypes.DECIMAL(12,4),allowNull:false,defaultValue:0.0000}
  }, {
    sequelize,
    modelName: 'invoice_items',
    timestamps:false
  });
  return invoice_items;
};