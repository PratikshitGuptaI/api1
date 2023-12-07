'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('booking_transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transaction_id:{
      type:Sequelize.STRING,
      allowNull:false
    } ,
    status:{
      type:Sequelize.STRING,
      allowNull:true
    },
    type: {
      type:Sequelize.STRING,
      allowNull:true
    },
    payment_method: {
      type:Sequelize.STRING,
      allowNull:true
    },
    data: {
      type:Sequelize.STRING,
      allowNull:true
    },
    invoice_id:{
      type:Sequelize.STRING,
      allowNull:false,
      references:{
        model:'invoices',
        key:'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    booking_id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      references:{
        model:'bookings',
        key:'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    created_at:
    {
      type:Sequelize.DATE,
      allowNull:false,
      defaultValue:Sequelize.fn('NOW')
    },
    updated_at:{
      type:Sequelize.DATE,
      allowNull:false,
      defaultValue:Sequelize.fn('NOW')
    },
    amount: {
      type:Sequelize.DECIMAL(12,4),
      allowNull:false,
      defaultValue:0.0000
    },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('booking_transactions');
  }
};