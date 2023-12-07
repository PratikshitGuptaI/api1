const express = require('express');
const router = express.Router();
const ModuleController = require('../controllers/moduleController');
const moduleController = new ModuleController();

router.get('/list', moduleController.getModulesWithActions);
router.get('/actionsList', moduleController.getModuleActions);

// router.post('/',moduleController.)
// router.post('/',moduleController.createRole);
// router.put('/',moduleController.updateRole);
// router.delete('/',moduleController.deleteRole);

module.exports = router;