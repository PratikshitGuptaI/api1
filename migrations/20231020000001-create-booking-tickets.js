'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('booking_tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sku: {type:Sequelize.STRING,allowNull:false},
    coupon_code: {type:Sequelize.STRING,allowNull:true},
    qty_ordered: {type:Sequelize.INTEGER,defaultValue:0},
    qty_invoiced: {type:Sequelize.INTEGER,defaultValue:0},
    qty_canceled: {type:Sequelize.INTEGER,defaultValue:0},
    qty_refunded: {type:Sequelize.INTEGER,defaultValue:0},
    price: {
      type:Sequelize.DECIMAL(12,4),
      allowNull:false,
      defaultValue:0.0000
    },
    total: {
      type:Sequelize.DECIMAL(12,4),
      allowNull:false,
      defaultValue:0.0000
    },
    total_invoiced: {
      type:Sequelize.DECIMAL(12,4),
      allowNull:false,
      defaultValue:0.0000
    },
    amount_refunded: {
      type:Sequelize.DECIMAL(12,4),
      allowNull:false,
      defaultValue:0.0000
    },
    discount_percent: {
      type:Sequelize.DECIMAL(12,4),
      defaultValue:0.0000
    },
    discount_amount: {
      type:Sequelize.DECIMAL(12,4),
      defaultValue:0.0000
    },
    discount_invoiced: {
      type:Sequelize.DECIMAL(12,4),
      defaultValue:0.0000
    },
    discount_refunded: {
      type:Sequelize.DECIMAL(12,4),
      defaultValue:0.0000
    },
    tax_percent: {
      type:Sequelize.DECIMAL(12,4),
      defaultValue:0.0000
    },
    tax_amount: {
      type:Sequelize.DECIMAL(12,4),
      defaultValue:0.0000
    },
    tax_amount_invoiced: {
      type:Sequelize.DECIMAL(12,4),
      defaultValue:0.0000
    },
    tax_amount_refunded: {
      type:Sequelize.DECIMAL(12,4),
      defaultValue:0.0000
    },
    booking_id: {
      type:Sequelize.INTEGER,
      allowNull:true,
      references:{
        model:'bookings',
        key:'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    parent_id: {
      type:Sequelize.INTEGER.UNSIGNED,
      allowNull:true
    },
    additional: {
      type:Sequelize.STRING,
      allowNull:true
    },
    attendance:{
      type:Sequelize.INTEGER,
      min:0,
      max:2,
      allowNull:false,
      defaultValue:0
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull:false,
      defaultValue:Sequelize.fn('NOW')
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull:false,
      defaultValue:Sequelize.fn('NOW')
    },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('booking_tickets');
  }
};