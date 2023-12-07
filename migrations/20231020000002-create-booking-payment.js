'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('booking_payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      method: {type:Sequelize.STRING,allowNull:false},
    method_title: {type:Sequelize.STRING,allowNull:false},
    booking_id: { type: Sequelize.INTEGER, allowNull:true ,
      references:{
        model:'bookings',
        key:'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',} ,
    additional: { type: Sequelize.STRING, allowNull:true },
    created_at: {type:Sequelize.DATE,defaultValue:Sequelize.fn('NOW'),allowNull:false},
    updated_at: {type:Sequelize.DATE,defaultValue:Sequelize.fn('NOW'),allowNull:false}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('booking_payments');
  }
};