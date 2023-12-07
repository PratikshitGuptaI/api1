const sequelize = require('../config/db.js');
const Sequelize = require('sequelize');
const Role = sequelize.Roles;
const User = sequelize.User;
const RolePermissions = sequelize.RolePermissions;
// (sequelize, Sequelize.DataTypes,
//   Sequelize.Model);
"use strict";

class RoleRepo {

  async getRoles(res, req) {
    const roles = await Role.findAll();
    const users = await User.findAll();
    if (roles.length != 0) {
      const formattedRoles = roles.map(item => ({
        ...item.dataValues,
        id: item.id,
        title: item.name,
        value: item.id,
        report_to: users.filter((element) => element.id == item.report_to).map(el => el.first_name.toString())[0],
        report_to_full_name: users.filter((element) => element.id == item.report_to).map(el => el.first_name.toString() + ' ' + el.last_name.toString())[0],
        createdAt: item.createdAt.toLocaleDateString(),
        updatedAt: item.updatedAt.toLocaleDateString(),
      }));
      return formattedRoles;
    }
    else {
      return 'No Roles Found';
    }
  }
  async getRoleByName(res, req) {
    try {
      const name = "ASM";
      const role = await Role.findAll({
        where: {
          name: name
        }
      });
      return role;

    } catch (error) {
      console.error(error);
      // res.status(500).json({ error: 'Internal Server Error' });
      return ({ error: 'Internal Server Error' });
      // res.status(400).json({ message: error.message });
    }
  }
  async createRole(req, res) {
    try {
      const name = req.body.name;
      const label = req.body.label;
      const report_to = req.body.report_to;
      const status = req.body.status;
      const created_by = req.body.created_by;
      const modified_by = req.body.modified_by;
      const permissions = req.body.permissions;
      // const {name,label,report_to,status,created_by,modified_by} = req.body;
      let role_id = 3;
      const role = await Role.create({
        name, label, report_to, status, created_by, modified_by
      }).then((role) => {
        role_id = role.id
      });
      let json = permissions.map(row => Object.assign(...row.map((j, i, v) => ({ role_id: role_id, module_id: v[0], action_id: j }))));
      // console.log(json);
      // const role_permissions = await RolePermissions.create({
      //   role_id,module_id,action_id
      // })
      const role_permissions = await RolePermissions.bulkCreate(json, { individualHooks: true });
      return role, role_permissions;
      //  return 1;
    }
    catch (err) {
      console.error(err);
      // return res.status(500).json({ error: 'Internal Server Error' });
      return ({ message: err + 'Internal Server Error' });
    }
  }
  async updateRole(req, res) {
    try {
      const { name, label, report_to, status, created_by, modified_by,permissions,role_id } = req.body;
      
      const role = await Role.update({
        name, label, report_to, status, created_by, modified_by
      }, {
        where: {
          name: name,
        },
      });
      const actions = await RolePermissions.destroy({
        where:{
          role_id:role_id
        }
      });
      let json = permissions.map(row => Object.assign(...row.map((j, i, v) => ({ role_id: role_id, module_id: v[0], action_id: j }))));
      const uniqueSet = new Set(json.map(JSON.stringify));
      const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
      const role_permissions = await RolePermissions.bulkCreate(uniqueArray, { individualHooks: true });
      return role,actions
      ,role_permissions
      // console.log(json);
      // const role_permissions = await RolePermissions.create({
      //   role_id,module_id,action_id
      // })
      // const role_permissions = await RolePermissions.bulkCreate(json, { individualHooks: true,updateOnDuplicate:[''] });
      // return ({ role });
    }
    catch (err) {
      console.error(err);
      // res.status(500).json({ error: 'Internal Server Error' });
      return ({ message: err.message });
    }
  }
  async deleteRole(roleid) {
    const role = Role.update({
      status: 1
    }, {
      where: {
        id: roleid
      }
    });
    return role;
  }
  async getRolesWithPermissions(roleId) {

    const list = await Role.findAll(
      {
        include: [{
          attributes: ['id', 'role_id', 'module_id', 'action_id'],
          model: RolePermissions,
          as: 'role_permissions'
        }],
      }
    );
    return list;
  }
  async getRolesWithPermissionsById(roleId) {

    const list = await Role.findAll(
      {
        where: {
          id: roleId
        },
        include: [{
          attributes: ['id', 'role_id', 'module_id', 'action_id'],
          model: RolePermissions,
          as: 'role_permissions',
        }],
      }
    );
    const role_permissions= list.map((el)=>el.role_permissions);
    const subsets = role_permissions[0].map(item => [item.module_id, item.action_id]);
    // const module_id = role_permissions.map((ep)=>ep.module_id);
    // const module_actions_id = role_permissions.map((ep)=>ep.action_id);
    // // const module_actions_id = module_actions.map((el,i)=>el.map((e)=>[module_id[i],e.id]));
    // const arr=[];
    // const modules_return = module_actions_id.map((e)=>e.map((el)=>{arr.push(el)}));
    return subsets;
  }
  async getModuleWithActionsById(roleId) {
    const list = await Role.findAll({
      where: {
        id: roleId
      },
      attributes: ['id'],
      include: [{
        attributes: ['id'],
        model: RolePermissions,
        as: 'role_permissions',
        include: [{
          attributes: ['id'],
          model: sequelize.Modules,
          include: [{
            attributes: ['id'],
            model: sequelize.ModuleActions
          }]
        }]
      }],
    });
    const role_permissions= list.map((el)=>el.role_permissions);
    const module = role_permissions[0].map((el)=>el.modules);
    const module_id = module.map((ep)=>ep[0].id);
    const module_actions = module.map((ep)=>ep[0].module_actions);
    const module_actions_id = module_actions.map((el,i)=>el.map((e)=>[module_id[i],e.id]));
    const arr=[];
    const modules_return = module_actions_id.map((e)=>e.map((el)=>{arr.push(el)}));
 const uniqueSet = new Set(arr.map(JSON.stringify));
const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    return uniqueArray;
    // return modules_return;
    // return list;
    // return module;
  }
}
module.exports = RoleRepo;