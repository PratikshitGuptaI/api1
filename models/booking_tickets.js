'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking_tickets extends Model {
    static associate(models) {
      // console.log('Starting BookingTickets->Booking association setup...');
      booking_tickets.belongsTo(models.Booking,{foreignKey:'id'})
      // console.log('Finished BookingTickets->Booking association setup');
    }
  }
  booking_tickets.init({
    id:{type:DataTypes.INTEGER.UNSIGNED,allowNull:false,autoIncrement:true,primaryKey:true},
    sku: {type:DataTypes.STRING,allowNull:false},
    coupon_code: {type:DataTypes.STRING,allowNull:true},
    qty_ordered: {type:DataTypes.INTEGER,defaultValue:0},
    qty_invoiced: {type:DataTypes.INTEGER,defaultValue:0},
    qty_canceled: {type:DataTypes.INTEGER,defaultValue:0},
    qty_refunded: {type:DataTypes.INTEGER,defaultValue:0},
    price: {
      type:DataTypes.DECIMAL(12,4),
      allowNull:false,
      defaultValue:0.0000
    },
    total: {
      type:DataTypes.DECIMAL(12,4),
      allowNull:false,
      defaultValue:0.0000
    },
    total_invoiced: {
      type:DataTypes.DECIMAL(12,4),
      allowNull:false,
      defaultValue:0.0000
    },
    amount_refunded: {
      type:DataTypes.DECIMAL(12,4),
      allowNull:false,
      defaultValue:0.0000
    },
    discount_percent: {
      type:DataTypes.DECIMAL(12,4),
      defaultValue:0.0000
    },
    discount_amount: {
      type:DataTypes.DECIMAL(12,4),
      defaultValue:0.0000
    },
    discount_invoiced: {
      type:DataTypes.DECIMAL(12,4),
      defaultValue:0.0000
    },
    discount_refunded: {
      type:DataTypes.DECIMAL(12,4),
      defaultValue:0.0000
    },
    tax_percent: {
      type:DataTypes.DECIMAL(12,4),
      defaultValue:0.0000
    },
    tax_amount: {
      type:DataTypes.DECIMAL(12,4),
      defaultValue:0.0000
    },
    tax_amount_invoiced: {
      type:DataTypes.DECIMAL(12,4),
      defaultValue:0.0000
    },
    tax_amount_refunded: {
      type:DataTypes.DECIMAL(12,4),
      defaultValue:0.0000
    },
    booking_id: {
      type:DataTypes.INTEGER.UNSIGNED,
      allowNull:true
    },
    parent_id: {
      type:DataTypes.INTEGER.UNSIGNED,
      allowNull:true
    },
    additional: {
      type:DataTypes.STRING,
      allowNull:true
    },
    attendance:{
      type:DataTypes.INTEGER,
      min:0,
      max:2,
      allowNull:false,
      defaultValue:0
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
  }, {
    sequelize,
    modelName: 'booking_tickets',
    timestamps:false
  });
  return booking_tickets;
};