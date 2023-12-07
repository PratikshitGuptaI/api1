'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('event_speakers', {
      // Define attributes here
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      day_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'event_days',
          key:'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      speaker_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      speaker_image: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      speaker_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      speaker_time: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('event_speakers');
  }
};