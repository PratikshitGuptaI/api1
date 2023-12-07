'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Modules extends Model {
    static associate(models) {
      // console.log('Starting ModuleActions association setup...');
      // Modules.hasMany(models.ModuleActions,{ foreignKey: 'module_id' });
      // console.log('ModuleActions Association setup complete.');
      Modules.hasMany(models.ModuleActions,{foreignKey:'module_id',sourceKey:'id'});
      // console.log('Starting RolePermissions association setup...');
      // Modules.hasMany(models.RolePermissions,{ foreignKey: 'module_id',as:'role_permissions',sourceKey:'id' });
      // console.log('RolePermissions Association setup complete.');
    }
  }
  Modules.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    alias: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    
  }, {
    // Define model options here
    sequelize,
    modelName: 'modules',
    timestamps: false,
  });
  return Modules; 
  
};