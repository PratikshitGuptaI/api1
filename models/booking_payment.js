'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking_payment extends Model {
    static associate(models) {     
      // console.log('Starting Booking association setup...');
      booking_payment.belongsTo(models.Booking,{foreignKey:'id'})
      // console.log('Finished Booking association setup');
    }
  }
  booking_payment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    method: {type:DataTypes.STRING,allowNull:false},
    method_title: {type:DataTypes.STRING,allowNull:false},
    booking_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull:true } ,
    additional: { type: DataTypes.STRING, allowNull:true },
    created_at: {type:DataTypes.DATE,defaultValue:Sequelize.fn('NOW')},
    updated_at: {type:DataTypes.DATE,defaultValue:Sequelize.fn('NOW')}
  }, {
    sequelize,
    modelName: 'booking_payment',
    timestamps:false
  });
  return booking_payment;
};