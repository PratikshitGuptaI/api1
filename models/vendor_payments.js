'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vendor_payments extends Model {
    static associate(models) {
      // console.log('Starting Event Attendance ->Event association setup...');
      // event_attendance.belongsTo(models.Event,{foreignKey:'id'})
      // console.log('Finished Event Attendance ->Event association setup');
    }
  }
  vendor_payments.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    proof_url: { type: DataTypes.STRING, allowNull: false },
    otp:{
      type:DataTypes.STRING,allowNull:false
    },
    is_verified:{
      type:DataTypes.INTEGER,allowNull:false,defaultValue:0
    }
  }, {
    sequelize,
    modelName: 'vendor_payments',
    timestamps: true
  });
  return vendor_payments;
};