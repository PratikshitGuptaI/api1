'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EVENTS extends Model {
    static associate(models) {

      // console.log('Starting EventDays association setup...');
      EVENTS.hasMany(models.EventDays,{ foreignKey: 'event_id' });
      // console.log('Finished EventDays association setup');
      // console.log('Starting Booking association setup...');
      EVENTS.hasMany(models.Booking,{foreignKey:'event_id'})
      // console.log('Finished Booking association setup');
      // console.log('Starting Invoices association setup...');
      EVENTS.hasMany(models.Invoices,{foreignKey:'event_id'})
      // console.log('Finished Invoices association setup');
    }
  }
  EVENTS.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    event_title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    event_image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    event_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    // event_sales_date:{
    //   type: DataTypes.DATEONLY,
    //   allowNull: false,
    // },
    event_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    event_venue: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    geo_link: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    no_of_days: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    event_type: {
      type: DataTypes.ENUM('Free', 'Paid'),
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull:false
    },
    no_of_ticket: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    max_ticket: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    is_vendor: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    qr_image:{
      type:DataTypes.STRING,
      allowNull:true
    },
    is_approved: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    is_published: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    is_finished: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    gst_available: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    terms_n_condition: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    contact_details: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    updated_by: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull:false,
      defaultValue:Sequelize.fn('NOW')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull:false,
      defaultValue:Sequelize.fn('NOW')
    },
    execution_points: {
      type: DataTypes.DOUBLE,
      allowNull:true
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'events',
    timestamps:false
  });
  return EVENTS;
};