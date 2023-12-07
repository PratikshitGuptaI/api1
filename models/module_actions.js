'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Module_Actions extends Model {
    static associate(models) {
      // console.log('Starting association setup...');
      // Module_Actions.belongsTo(models.Modules,{ foreignKey: 'id' });
      Module_Actions.hasMany(models.Modules,{ foreignKey: 'id',sourceKey:'module_id' });
      // console.log('Modules Association setup complete.');
      // Module_Actions.hasMany(models.RolePermissions,{ foreignKey: 'module_id',sourceKey:'module_id',as:'role_permissions_actions' });
      // Module_Actions.hasMany(models.RolePermissions,{ foreignKey: 'action_id',as:'role_permissions' });
      // console.log('ROle Association setup complete.');
    }
  }
  Module_Actions.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    module_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  }, {
    sequelize,
    modelName: 'module_actions',
    timestamps: false,
  });
  return Module_Actions;
};
