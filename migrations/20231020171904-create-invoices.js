'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      increment_id: {type:Sequelize.STRING,allowNull:true},
    event_id: {type:Sequelize.INTEGER,allowNull:false},
    email_sent: {type:Sequelize.INTEGER,allowNull:true,defaultValue:0},
    total_qty: {type:Sequelize.INTEGER,allowNull:true},
    sub_total: {type:Sequelize.DECIMAL(12,4),defaultValue:0.0000},
    grand_total: {type:Sequelize.DECIMAL(12,4),defaultValue:0.0000},
    tax_amount: {type:Sequelize.DECIMAL(12,4),defaultValue:0.0000},
    discount_amount: {type:Sequelize.DECIMAL(12,4),defaultValue:0.0000},
    booking_id: {type:Sequelize.INTEGER,allowNull:true,references:{
      model:'bookings',
      key:'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',},
    created_at: {type:Sequelize.DATE,allowNull:true,defaultValue:Sequelize.fn('NOW')},
    updated_at: {type:Sequelize.DATE,allowNull:true,defaultValue:Sequelize.fn('NOW')},
    transaction_id: {type:Sequelize.INTEGER,allowNull:true,
      references:{
      model:'booking_transactions',
      key:'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',},
    reminders: {type:Sequelize.INTEGER,allowNull:false,defaultValue:0},
    next_reminder_at: {type:Sequelize.DATE,allowNull:true,defaultValue:Sequelize.fn('NOW')}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('invoices');
  }
};