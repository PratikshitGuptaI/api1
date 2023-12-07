'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role_Permissions extends Model {
    static associate(models) {
      // Role_Permissions.belongsTo(models.User,{ foreignKey:'role',as:'users'} )
      // console.log('Starting Roles association setup...');
      Role_Permissions.belongsTo(models.Roles, { foreignKey: 'id' ,as:'roles'});
      // console.log('Finished Roles association setup');
      // console.log('Starting Modules association setup...');
      // Role_Permissions.belongsTo(models.Modules,{ foreignKey: 'id',sourceKey:'module_id' });
      Role_Permissions.hasMany(models.Modules,{ foreignKey: 'id',sourceKey:'module_id' });
      // console.log('Finished Modules association setup');
      // console.log('Starting ModuleActions association setup...');
      Role_Permissions.hasMany(models.ModuleActions,{foreignKey:'id',sourceKey:'action_id'})
      // Role_Permissions.hasMany(models.ModuleActions,{ foreignKey: 'module_id',sourceKey:'module_id',as:'module_actions_modules' });
      // Role_Permissions.belongsTo(models.ModuleActions,{ foreignKey: 'module_id',as:'module_actions',sourceKey:'module_id' });
      // Role_Permissions.belongsTo(models.ModuleActions,{ foreignKey: 'id' ,as:'module_actions'});
      // console.log('Finished ModuleActions association setup');
    }
  }
  Role_Permissions.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    action_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    sequelize,
    modelName: 'role_permissions',
    timestamps: false,
  });
  return Role_Permissions;
};