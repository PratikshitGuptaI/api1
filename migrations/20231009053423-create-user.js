'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      last_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_image: {
        allowNull: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      department: {
        allowNull: true,
        type: Sequelize.STRING
      },
      role: {
        foreignKey: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'roles',
          key:'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      report_to: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      freeze: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      mobile: {
        allowNull: false,
        type: Sequelize.STRING
      },
      remember_token: {
        allowNull: true,
        type: Sequelize.STRING
      },
      is_vendor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue:'0'
      },
      gst_no: {
        allowNull: true,
        type: Sequelize.STRING
      },
      created_by: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      modified_by: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      last_login_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      last_session: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};