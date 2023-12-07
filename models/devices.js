'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class devices extends Model {
    static associate(models) {
    }
  }
  devices.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    TokenId: {type:DataTypes.STRING,allowNull:true},
    text: {type:DataTypes.STRING,allowNull:true},
    MacAddr: {type:DataTypes.STRING,allowNull:true},
    osvName: {type:DataTypes.STRING,allowNull:true},
    brandmodel: {type:DataTypes.STRING,allowNull:true},
    Version: {type:DataTypes.STRING,allowNull:true},
    is_accessed:{type:DataTypes.INTEGER,allowNull:true},
    appLoginDate: {type:DataTypes.DATE,allowNull:true},
    app_url:{type:DataTypes.STRING,allowNull:true}
  }, {
    sequelize,
    modelName: 'devices',
    timestamps:false
  });
  return devices;
};