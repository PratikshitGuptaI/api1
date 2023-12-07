'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoice_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sku: {type:Sequelize.STRING,allowNull:true},
    qty:{type:Sequelize.INTEGER,allowNull:true},
    price: {type:Sequelize.DECIMAL(12,4),allowNull:false,defaultValue:0.0000},
    total: {type:Sequelize.DECIMAL(12,4),allowNull:false,defaultValue:0.0000},
    tax_amount: {type:Sequelize.DECIMAL(12,4),allowNull:false,defaultValue:0.0000},
    booking_ticket_id: {type:Sequelize.INTEGER,allowNull:true,
      references:{
        model:'booking_tickets',
        key:'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',},
    invoice_id: {type:Sequelize.INTEGER,allowNull:true,
      references:{
        model:'invoices',
        key:'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',},
    parent_id: {type:Sequelize.INTEGER.UNSIGNED,allowNull:true},
    additional: {type:Sequelize.STRING,allowNull:true},
    created_at: {type:Sequelize.DATE,defaultValue:Sequelize.fn('NOW'),allowNull:true},
    updated_at: {type:Sequelize.DATE,defaultValue:Sequelize.fn('NOW'),allowNull:true},
    discount_percent: {type:Sequelize.DECIMAL(12,4),allowNull:false,defaultValue:0.0000},
    discount_amount: {type:Sequelize.DECIMAL(12,4),allowNull:false,defaultValue:0.0000}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('invoice_items');
  }
};