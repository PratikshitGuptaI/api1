'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HomeBottomSection extends Model {
    static associate(models) {
    }
  }
  HomeBottomSection.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    background_img: {
      type: DataTypes.TEXT,
      allowNull:false,
    },
    sub_heading: {
      type: DataTypes.TEXT,
      allowNull:false,
    },
    heading: {
      type: DataTypes.TEXT,
      allowNull:false,
    },
    button_label: {
      type: DataTypes.TEXT,
      allowNull:false,
    },
    button_link: {
      type: DataTypes.TEXT,
      allowNull:false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull:false,
      defaultValue:Sequelize.fn('NOW')
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
  },{
    sequelize,
    modelName: 'home_bottom_section',
    timestamps:false
  });
  return HomeBottomSection;
};