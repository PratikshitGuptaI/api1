'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    static associate(models) {
      // console.log('Starting Event association setup...');
      booking.belongsTo(models.Event,{foreignKey:'id'});
      // console.log('Finished Event association setup');      
      // console.log('Starting BookingPayment association setup...');
      booking.hasMany(models.BookingPayment,{foreignKey:'booking_id'})
      // console.log('Finished BookingPayment association setup');    
      // console.log('Starting BookingTransaction association setup...');
      booking.hasMany(models.BookingTransaction,{foreignKey:'booking_id'})
      // console.log('Finished BookingTransaction association setup');      
      // console.log('Starting BookingTickets association setup...');
      booking.hasMany(models.BookingTickets,{foreignKey:'booking_id'})
      // console.log('Finished BookingTickets association setup');
    }
  }
  booking.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    increment_id: 
    {
      type:DataTypes.STRING,
      allowNull: false,
    },
    event_id: 
    {
      type:DataTypes.INTEGER,
      allowNull: false,
    },
    status:
    {
      type:DataTypes.STRING,
      allowNull: true,
    },
    customer_email:
    {
      type:DataTypes.STRING,
      allowNull: true,
    },
    customer_first_name:
    {
      type:DataTypes.STRING,
      allowNull: true,
    },
    customer_last_name:
    {
      type:DataTypes.STRING,
      allowNull: true,
    },
    customer_vat_id:
    {
      type:DataTypes.STRING,
      allowNull: true,
    },
    coupon_code: 
    {
      type:DataTypes.STRING,
      allowNull: true,
    },
    total_qty_ordered:
    {
      type:DataTypes.INTEGER,
      allowNull: true
    },
    grand_total:
    {
      type:DataTypes.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    grand_total_invoiced:{
      type:DataTypes.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    grand_total_refunded: {
      type:DataTypes.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    sub_total: {
      type:DataTypes.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    sub_total_invoiced: {
      type:DataTypes.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    sub_total_refunded: {
      type:DataTypes.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    discount_percent: {
      type:DataTypes.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    discount_amount: {
      type:DataTypes.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    discount_invoiced: {
      type:DataTypes.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    discount_refunded: {
      type:DataTypes.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    tax_amount: {
      type:DataTypes.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    tax_amount_invoiced: {
      type:DataTypes.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    tax_amount_refunded: {
      type:DataTypes.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    applied_offer_rule_ids: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'booking',
    timestamps:false
  });
  return booking;
};