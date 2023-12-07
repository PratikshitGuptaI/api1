const ModuleRepo = require('../repo/module-repo');
const moduleRepo = new ModuleRepo();

class ModuleController{
    async getModule(req,res){
        const module = await moduleRepo.getModules();
        if(!module){
          return res.status(200).json('No Module Found');
        }
        else{
          return res.status(200).json(module);
        }
      }
    async getModuleActions(req,res){
      try{
        const actions = await moduleRepo.getModuleActions();
        if(!actions){
          return res.status(200).json({result:'No Module Found'});
        }
        else{
          return res.status(200).json({result:actions});
        }
      }
      catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        res.status(400).json({ message: error.message });
      }
    }
    async getModulesWithActions(req,res){
      try{

        const result = await moduleRepo.getModuleswithActions();
        if(!result){
          return res.status(200).json({result:'No Module Found'});
        }
        else{
          return res.status(200).json({result:result});
        }
      }
      catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
        res.status(400).json({ message: error.message });
      }
    }
    async createModule(req,res){

    }
}

module.exports = ModuleController