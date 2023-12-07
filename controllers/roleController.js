const RoleRepo = require('../repo/role-repo');
const rolerepo = new RoleRepo();
class RoleController  {
    async createRole(req,res){
        const role = await rolerepo.createRole(req);
        return res.status(200).json(role);
    }
    async updateRole(req,res){
        const role = await rolerepo.updateRole(req);
        return res.status(200).json(role);
    }
    async deleteRole(req,res){
      try{
        const roleid = req.params.roleId;
        const role = await rolerepo.deleteRole(roleid);
        if(!role){
          return res.status(200).json('Cannot Update Given Role');
        }else{

          return res.status(200).json(role);
        }

      }catch(error){
      console.error(error);
      res.status(400).json({ message: error.message });
      }
    }
    async getRoles(req,res){
      try{
      const role = await rolerepo.getRoles();
      if(!role){
        return res.status(200).json({result:'No Roles Found'});
      }
      else{
        return res.status(200).json({result:role});
      }
    }
    catch(error){
      console.error(error);
      // res.status(500).json({ error: 'Internal Server Error' });
      res.status(400).json({ message: error.message });
    }
    }
    async getRoleById(req,res){
      try{
        const userId = req.body.id;
        const role = await rolerepo.getRolesWithPermissionsById(userId);
        if(!role){
          return res.status(200).json({result:'No Roles with Permissions Found with '+userId});
        }
        else{
          return res.status(200).json({result:role});
        }
      }
      catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        res.status(400).json({ message: error.message });
      }
    }
    async getRoleByName(req,res){
      const role = await rolerepo.getRoleByName(req);
      return res.status(201).json(role);
    }
    async getRolesWithPermissions(req,res){
      try{
      const list = await rolerepo.getRolesWithPermissions();
      if(!list){
        return res.status(200).json({result:'No Roles with Permissions Found'});
      }
      else{
        return res.status(200).json({result:list});
      }
    }
    catch(error){
      console.error(error);
      // res.status(500).json({ error: 'Internal Server Error' });
      res.status(400).json({ message: error.message });
    }
    }
    async getRolesWithPermissionsById(req,res){
      try{
        const roleid = req.params.roleid;
        // const roles = await rolerepo.getRolesWithPermissionsById(roleid);
        const roles = await rolerepo.getRolesWithPermissionsById(roleid);
        // const roles = await rolerepo.getModuleWithActionsById(roleid);
        const formattedRoles = roles;
        // roles.map(role => ({
        //   ...role.dataValues,
        //   array_role_permissions:role.role_permissions,
        //   array_module: role.role_permissions.map((mod)=>{mod.module_id})
        // }));
        if(!formattedRoles){
          return res.status(200).json({result:'No Roles with Permissions Found'});
        }
        else{
          return res.status(200).json({result:formattedRoles});
        }
      }
      catch(error){
        console.error(error);
        res.status(400).json({ message: error.message });
        // res.status(500).json({ error: 'Internal Server Error' });
      }
    }

}

module.exports = RoleController