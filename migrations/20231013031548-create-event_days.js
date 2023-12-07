'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('event_days', {
      // Define attributes here
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references:{
          model:'events',
          key:'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      speakers_day: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      speakers_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue: Sequelize.fn('NOW')
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('event_days');
  }
};