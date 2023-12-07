'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    TokenId: {type:Sequelize.STRING,allowNull:true},
    text: {type:Sequelize.STRING,allowNull:true},
    MacAddr: {type:Sequelize.STRING,allowNull:true},
    osvName: {type:Sequelize.STRING,allowNull:true},
    brandmodel: {type:Sequelize.STRING,allowNull:true},
    Version: {type:Sequelize.STRING,allowNull:true},
    is_accessed:{type:Sequelize.INTEGER,allowNull:true},
    appLoginDate: {type:Sequelize.DATE,allowNull:true},
    app_url:{type:Sequelize.STRING,allowNull:true}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('devices');
  }
};