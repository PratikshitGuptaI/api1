'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class offer_rules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  // `name` varchar(191) DEFAULT NULL,
  // `description` varchar(191) DEFAULT NULL,
  // `event_id` int(11) NOT NULL,
  // `starts_from` datetime DEFAULT NULL,
  // `ends_till` datetime DEFAULT NULL,
  // `status` tinyint(1) NOT NULL DEFAULT '0',
  // `usage_per_customer` int(11) NOT NULL DEFAULT '0',
  // `uses_per_coupon` int(11) NOT NULL DEFAULT '0',
  // `times_used` int(10) UNSIGNED NOT NULL DEFAULT '0',
  // `condition_type` tinyint(1) NOT NULL DEFAULT '1',
  // `conditions` varchar(191) DEFAULT NULL,
  // `end_other_rules` tinyint(1) NOT NULL DEFAULT '0',
  // `action_type` varchar(191) DEFAULT NULL,
  // `discount_amount` decimal(12,4) NOT NULL DEFAULT '0.0000',
  // `discount_quantity` int(11) NOT NULL DEFAULT '1',
  // `discount_step` varchar(191) NOT NULL DEFAULT '1',
  // `sort_order` int(10) UNSIGNED NOT NULL DEFAULT '0',
  // `created_at` timestamp NULL DEFAULT NULL,
  // `updated_at` timestamp NULL DEFAULT NULL
  offer_rules.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {type:DataTypes.STRING,allowNull:true},
    description: {type:DataTypes.STRING,allowNull:true},
    event_id: {type:DataTypes.INTEGER,allowNull:false},
    starts_from:{ type:DataTypes.DATE,allowNull:true},
    ends_till:{ type:DataTypes.DATE,allowNull:true},
    status: {type:DataTypes.INTEGER,defaultValue:0,allowNull:false},
    usage_per_customer: {type:DataTypes.INTEGER,defaultValue:0,allowNull:false},
    uses_per_coupon: {type:DataTypes.INTEGER,defaultValue:0,allowNull:false},
    times_used: {type:DataTypes.INTEGER,defaultValue:0,allowNull:false},
    condition_type: {type:DataTypes.INTEGER,defaultValue:1,allowNull:false},
    conditions: {type:DataTypes.STRING,allowNull:true},
    end_other_rules: {type:DataTypes.INTEGER,defaultValue:0,allowNull:false},
    action_type: {type:DataTypes.STRING,allowNull:true},
    discount_amount: {type:DataTypes.DECIMAL(12,4),defaultValue:0.0000,allowNull:false},
    discount_quantity: {type:DataTypes.INTEGER,defaultValue:1,allowNull:false},
    discount_step: {type:DataTypes.STRING,defaultValue:'1',allowNull:false},
    sort_order: {type:DataTypes.INTEGER.UNSIGNED,defaultValue:0,allowNull:false},
    created_at:{ type:DataTypes.DATE,allowNull:false,defaultValue:Sequelize.fn('NOW')},
    updated_at: { type:DataTypes.DATE,allowNull:false,defaultValue:Sequelize.fn('NOW')}
  }, {
    sequelize,
    modelName: 'offer_rules',
    timestamps:false
  });
  return offer_rules;
};