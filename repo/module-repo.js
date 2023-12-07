const sequelize = require('../config/db.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Module = sequelize.Modules;
const ModuleAction = sequelize.ModuleActions;
// (sequelize, Sequelize.DataTypes,
//     Sequelize.Model);
"use strict";

class ModuleRepo{
    async getModuleActions(id){
        const actions = await ModuleAction.findAll();
        return actions;
    }
    async getModules(){
        const modules = await Module.findAll();
        return modules;
    }
    async getModuleswithActions(){
        const modules = await Module.findAll(
            {
            attributes: ['id', 'name','alias'],
            include:  [{ 
                model: ModuleAction,right:true,
        }],
        }
        );
        return modules;
    }

}
module.exports = ModuleRepo;