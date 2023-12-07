'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class USERS extends Model {
    static associate(models) {
      
      // console.log('Starting RolePermissions association setup...');
      USERS.hasOne(models.Roles,{foreignKey:'id',as:'roles',sourceKey:'role'})
      // USERS.belongsTo(models.Roles,{foreignKey:'id',as:'roles'})
      // USERS.hasMany(models.RolePermissions, { foreignKey: 'role_id', as: 'role_permissions' });
      // USERS.hasOne(models.Roles, { foreignKey: 'id', as: 'roles' });
      // console.log('Finished RolePermissions association setup');
    }
  }
  USERS.init({

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userid: {
      allowNull: false,
      type: DataTypes.STRING,
      unique:true
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    last_name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user_image: {
      allowNull: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    department: {
      allowNull: true,
      type: DataTypes.STRING
    },
    role: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.INTEGER
    },
    report_to: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    status: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    freeze: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    mobile: {
      allowNull: false,
      type: DataTypes.STRING
    },
    remember_token: {
      allowNull: true,
      type: DataTypes.STRING
    },
    is_vendor: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue:'0'
    },
    gst_no: {
      allowNull: true,
      type: DataTypes.STRING
    },
    created_by: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    modified_by: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    last_login_at: {
      allowNull: true,
      type: DataTypes.DATE
    },
    last_session: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      timestamps:false
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return USERS;
};