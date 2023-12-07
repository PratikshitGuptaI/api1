'use strict';
const {
  Model,Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ROLES extends Model {
    static associate(models) {
      // console.log('Starting RolePermissions association setup...');
      // ROLES.belongsTo(models.User,{foreignKey: 'role',as:'users'});
      // ROLES.belongsTo(models.User,{foreignKey: 'role',as:'users'});
      // ROLES.hasOne(models.User,{foreignKey: 'role',as:'users'});
      ROLES.hasMany(models.RolePermissions,{foreignKey: 'role_id'});
      // console.log('Starting RolePermissions association setup...');
      // console.log('Role Permission Association setup complete.');
      // console.log('Role Permission Association setup complete.');
    }
  }
  ROLES.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    report_to: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
      min: 0,    
      max: 4,  
    },
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue:0
    },
    modified_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue:0
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue:Sequelize.fn('NOW')
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue:Sequelize.fn('NOW')
    }
  }, {
    sequelize,
    modelName: 'roles',
    timestamps:false
  });
  return ROLES;
  
};