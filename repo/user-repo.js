const sequelize = require('../config/db.js');
const Sequelize = require('sequelize');
const User = sequelize.User;
const Role = sequelize.Roles;
// (sequelize, Sequelize.DataTypes,
//     Sequelize.Model);
const Module = sequelize.Modules;
const ModuleAction = sequelize.ModuleActions;
// (sequelize, Sequelize.DataTypes,
//       Sequelize.Model);

"use strict";

class UserRepo {

  //get all users
  //get user by id
  //get user by name
  //create User
  //update User
  //delete user
  async getUserRole(userId){
    const role = await User.findOne({
      where:{
        userid: userId
      },
      include: {
        attributes:['id','name'],
        model:Role,
        as:'roles',
      }
    })
    return role.roles
  }
  async getAllUsers() {
    const users = await User.findAll({
      where: {
        status: 0
      }
    });
    const roles = await Role.findAll();
    const formattedUsers = users.map(item => ({
      ...item.dataValues,
      role: roles.find((element) => element.id == item.role),
      report_to: users.filter((element) => element.id == item.report_to).map(el => el.first_name.toString())[0],
      report_to_full_name: users.filter((element) => element.id == item.report_to).map(el => el.first_name.toString() + ' ' + el.last_name.toString())[0],
      title: item.first_name,
      value: item.id,
      props: { subtitle: item.department },
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
    // users.createdAt = users.createdAt.format('YYYY-MM-DD');
    return formattedUsers;
  }
  async deleteUser(userId) {
    const user = await User.update({ freeze: 1,status:1 }, {
      where: {
        userid: userId
      }
    });
    return user;
  }
  async getUserById(userId) {
    const user = await User.findOne({
      where: {
        userid: userId
      }
    });
    return user;
  }
  async getAllRoutes(id) {
    try {
      const routes = await Module.findAll(
        {
          attributes: ['id', 'name', 'alias'],
          include: [{
            model: ModuleAction, right: true
          }],
        }
      );
      // res.json(routes);
      return routes;
    }
    catch (error) {
      console.error(error);
      // res.status(500).json({ error: 'Internal Server Error' });
      return ({ message: error.message });
    }
  }
  async getUserRoutes(id) {
    try {
      // const routes = await Module.findAll(
      //   {
      //     attributes: ['id', 'name', 'alias'],
      //     include: [{
      //       model: ModuleAction, right: true
      //     }],
      //   }
      // );
      const routes = await User.findOne({
        where:{
          userid:id
        },
        attributes:['id','userid','role'],
        include:[{
          attributes:['id'],
          model:Role,
          as:'roles',
          include: [{
            attributes: ['id','action_id','module_id'],
            model: sequelize.RolePermissions,
            as: 'role_permissions',
            // include: [{
            //   attributes: ['id','alias'],
            //   model: sequelize.Modules,
              include: [{
                attributes: ['id','alias'],
                model: sequelize.ModuleActions,
                include:[{
                  attributes:['id','alias'],
                  model: sequelize.Modules,
                }]
              }]
            // }]
        }]
        }]
      })
      const arr = [];
      const roles = routes.roles;
      const role_permissions= roles.role_permissions;
      const list = role_permissions.map((el)=>el.module_actions[0]);
      const modules = list.map((e)=>{e.modules});
      const module_actions = list.map((e)=>{  arr.push([e.modules[0].alias,e.alias])});
      // const module_alias = module.map((ep)=>ep.alias);
      // const module_actions = module.map((ep)=>ep.module_actions);
      // const module_actions_id = module_actions.map((el,i)=>el.map((e)=>[module_alias[i],e.alias]));
      // const arr=[];
      // const modules_return = module_actions_id.map((e)=>e.map((el)=>{arr.push(el)}));
      // res.json(routes);
      // return arr;
      return arr;
    }
    catch (error) {
      console.error(error);
      // res.status(500).json({ error: 'Internal Server Error' });
      return ({ message: error.message });
    }
  }
  async createUser(req) {
    try {
      const userid = req.body.userid;
      const first_name = req.body.firstName;
      const last_name = req.body.lastName;
      const email = req.body.email;
      const password = req.body.password;
      const department = req.body.department;
      const role = req.body.role;
      const report_to = req.body.report_to;
      const mobile = req.body.mobileNo;
      const isVendor = req.body.isVendor;
      const user = await User.create({
        userid, first_name, last_name, email, password, department, role, report_to, mobile, isVendor
      });
      return user;
    }
    catch (error) {
      console.error(error);
      // return ({ error: 'Internal Server Error' });
      return ({ message: error.message + 'Internal Server Error' });
    }
  }
  async updateUser(req) {
    const userid = req.params.userId;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const department = req.body.department;
    const role = req.body.role;
    const report_to = req.body.report_to;
    const mobile = req.body.mobile;
    const status = req.body.status;
    const user = await User.update(
      {
        first_name: first_name, last_name: last_name,
        email: email, department: department,
        role: role, report_to: report_to, mobile: mobile, status: status, updatedAt: Sequelize.fn('NOW')
      }, {
      where: {
        userid: userid
      }
    });
    return user;
  }
}

module.exports = UserRepo;