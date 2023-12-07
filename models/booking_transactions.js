'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking_transactions extends Model {
    static associate(models) {
      // console.log('Starting BookingTransactions ->Invoices association setup...');
      booking_transactions.hasMany(models.Invoices,{foreignKey:'id'});
      // console.log('Finished BookingTransactions ->Invoices association setup');
      // console.log('Starting BookingTransactions ->Booking association setup...');
      booking_transactions.belongsTo(models.Booking,{foreignKey:'id'});
      // console.log('Finished BookingTransactions ->Booking association setup');
    }
  }
  booking_transactions.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    transaction_id:{
      type:DataTypes.STRING,
      allowNull:false
    } ,
    status:{
      type:DataTypes.STRING,
      allowNull:true
    },
    type: {
      type:DataTypes.STRING,
      allowNull:true
    },
    payment_method: {
      type:DataTypes.STRING,
      allowNull:true
    },
    data: {
      type:DataTypes.STRING,
      allowNull:true
    },
    invoice_id:{
      type:DataTypes.STRING,
      allowNull:false
    },
    booking_id:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    amount: {
      type:DataTypes.DECIMAL(12,4),
      allowNull:false,
      defaultValue:0.0000
    },
  }, {
    sequelize,
    modelName: 'booking_transactions',
    timestamps:false
  });
  return booking_transactions;
};