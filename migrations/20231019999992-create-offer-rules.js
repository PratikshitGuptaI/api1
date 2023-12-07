'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('offer_rules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {type:Sequelize.STRING,allowNull:true},
      description: {type:Sequelize.STRING,allowNull:true},
      event_id: {type:Sequelize.INTEGER,allowNull:false,
        primaryKey: true,
        allowNull:false,
        references:{
          model:'events',
          key:'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',},
      starts_from:{ type:Sequelize.DATE,allowNull:true},
      ends_till:{ type:Sequelize.DATE,allowNull:true},
      status: {type:Sequelize.INTEGER,defaultValue:0,allowNull:false},
      usage_per_customer: {type:Sequelize.INTEGER,defaultValue:0,allowNull:false},
      uses_per_coupon: {type:Sequelize.INTEGER,defaultValue:0,allowNull:false},
      times_used: {type:Sequelize.INTEGER,defaultValue:0,allowNull:false},
      condition_type: {type:Sequelize.INTEGER,defaultValue:1,allowNull:false},
      conditions: {type:Sequelize.STRING,allowNull:true},
      end_other_rules: {type:Sequelize.INTEGER,defaultValue:0,allowNull:false},
      action_type: {type:Sequelize.STRING,allowNull:true},
      discount_amount: {type:Sequelize.DECIMAL(12,4),defaultValue:0.0000,allowNull:false},
      discount_quantity: {type:Sequelize.INTEGER,defaultValue:1,allowNull:false},
      discount_step: {type:Sequelize.STRING,defaultValue:'1',allowNull:false},
      sort_order: {type:Sequelize.INTEGER.UNSIGNED,defaultValue:0,allowNull:false},
      created_at:{ type:Sequelize.DATE,allowNull:false,defaultValue:Sequelize.fn('NOW')},
      updated_at: { type:Sequelize.DATE,allowNull:false,defaultValue:Sequelize.fn('NOW')}
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('offer_rules');
  }
};