'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('home_banners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      banner_url: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      banner_name: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      banner_type: {
        type: Sequelize.ENUM('Image', 'facebook'),
        allowNull:false,
      },
      active_to: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      active_from: {
        type: Sequelize.DATE,
        allowNull:false,
      },
      extension: {
        type: Sequelize.STRING,
        allowNull:false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('home_banners');
  }
};