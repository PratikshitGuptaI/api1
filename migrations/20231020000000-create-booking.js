'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      increment_id: 
    {
      type:Sequelize.STRING,
      allowNull: false,
    },
    event_id: 
    {
      type:Sequelize.INTEGER,
      allowNull: false,
      references:{
        model:'events',
        key:'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    status:
    {
      type:Sequelize.STRING,
      allowNull: true,
    },
    customer_email:
    {
      type:Sequelize.STRING,
      allowNull: true,
    },
    customer_first_name:
    {
      type:Sequelize.STRING,
      allowNull: true,
    },
    customer_last_name:
    {
      type:Sequelize.STRING,
      allowNull: true,
    },
    customer_vat_id:
    {
      type:Sequelize.STRING,
      allowNull: true,
    },
    coupon_code: 
    {
      type:Sequelize.STRING,
      allowNull: true,
    },
    total_qty_ordered:
    {
      type:Sequelize.INTEGER,
      allowNull: true
    },
    grand_total:
    {
      type:Sequelize.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    grand_total_invoiced:{
      type:Sequelize.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    grand_total_refunded: {
      type:Sequelize.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    sub_total: {
      type:Sequelize.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    sub_total_invoiced: {
      type:Sequelize.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    sub_total_refunded: {
      type:Sequelize.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    discount_percent: {
      type:Sequelize.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    discount_amount: {
      type:Sequelize.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    discount_invoiced: {
      type:Sequelize.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    discount_refunded: {
      type:Sequelize.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    tax_amount: {
      type:Sequelize.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    tax_amount_invoiced: {
      type:Sequelize.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
    },
    tax_amount_refunded: {
      type:Sequelize.DECIMAL(12,4),
      allowNull: true,
      defaultValue:0.0000
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
      applied_offer_rule_ids: {
        type: Sequelize.INTEGER,
        references:{
          model:'offer_rules',
          key:'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bookings');
  }
};