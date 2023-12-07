'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('event_attendances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        event_id:{
         type:Sequelize.INTEGER,
         allowNull:false
        },
        customer_name: {type:Sequelize.TEXT},
        customer_email: {type:Sequelize.TEXT},
        customer_mobile: {type:Sequelize.TEXT},
        comments: {type:Sequelize.TEXT},
        created_at: {type:Sequelize.DATE,allowNull:false,defaultValue:Sequelize.fn('NOW')},
        updated_at: {type:Sequelize.DATE,allowNull:false,defaultValue:Sequelize.fn('NOW')}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('event_attendances');
  }
};