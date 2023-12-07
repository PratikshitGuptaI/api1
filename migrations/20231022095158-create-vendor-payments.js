'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vendor_payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      booking_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      proof_url: { type: Sequelize.STRING, allowNull: false },
      otp:{
        type:Sequelize.STRING,allowNull:false
      },
      is_verified:{
        type:Sequelize.INTEGER,allowNull:false,defaultValue:0
      },
        createdAt: {type:Sequelize.DATE,allowNull:false,defaultValue:Sequelize.fn('NOW')},
        updatedAt: {type:Sequelize.DATE,allowNull:false,defaultValue:Sequelize.fn('NOW')}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('vendor_payments');
  }
};