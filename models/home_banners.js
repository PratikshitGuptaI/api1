'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HomeBanners extends Model {
    static associate(models) {
    }
  }
  HomeBanners.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    banner_url: {
      type: DataTypes.TEXT,
      allowNull:false,
    },
    banner_name: {
      type: DataTypes.TEXT,
      allowNull:false,
    },
    banner_type: {
      type: DataTypes.ENUM('Image', 'facebook'),
      allowNull:false,
    },
    active_to: {
      type: DataTypes.DATE,
      allowNull:false,
    },
    active_from: {
      type: DataTypes.DATE,
      allowNull:false,
    },
    extension: {
      type: DataTypes.STRING,
      allowNull:false,
    },
  },{
    sequelize,
    modelName: 'home_banners',
    timestamps:false
  });
  return HomeBanners;
};