'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event_attendance extends Model {
    static associate(models) {
      // console.log('Starting Event Attendance ->Event association setup...');
      event_attendance.belongsTo(models.Event,{foreignKey:'id'})
      // console.log('Finished Event Attendance ->Event association setup');
    }
  }
  event_attendance.init({
    id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
    event_id:{
     type:DataTypes.INTEGER,
     allowNull:false
    },
    customer_name: {type:DataTypes.TEXT},
    customer_email: {type:DataTypes.TEXT},
    customer_mobile: {type:DataTypes.TEXT},
    comments: {type:DataTypes.TEXT},
    created_at: {type:DataTypes.DATE,allowNull:false,defaultValue:Sequelize.fn('NOW')},
    updated_at: {type:DataTypes.DATE,allowNull:false,defaultValue:Sequelize.fn('NOW')}
  }, {
    sequelize,
    modelName: 'event_attendance',
    timestamps:false
  });
  return event_attendance;
};