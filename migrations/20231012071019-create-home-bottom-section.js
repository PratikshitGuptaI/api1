'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('home_bottom_section', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      background_img: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      sub_heading: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      heading: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      button_label: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      button_link: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
    updated_at: {
      type: Sequelize.DATE,
      allowNull:false,
      defaultValue:Sequelize.fn('NOW')
    },
    updated_by: {
      type: Sequelize.INTEGER,
      allowNull:false
    },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('home_bottom_section');
  }
};