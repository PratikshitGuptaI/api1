'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      // Define attributes here
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      event_title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      event_image: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      event_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      event_time: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      event_venue: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      geo_link: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      no_of_days: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      category: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      event_type: {
        type: Sequelize.ENUM('Free', 'Paid'),
        allowNull: false,
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull:false
      },
      no_of_ticket: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      max_ticket: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      is_vendor: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      qr_image:{
        type: Sequelize.STRING,
        allowNull:true
      },
      is_approved: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      is_published: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      is_finished: {
        type: Sequelize.INTEGER,
        allowNull:false,
      },
      gst_available: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      terms_n_condition: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      contact_details: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull:false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull:false
      },
      execution_points: {
        type: Sequelize.DOUBLE,
        allowNull:true
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull:false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events');
  }
};