const express = require('express');
const router = express.Router();
const DevicesController = require('../controllers/devicesController');
const devicescontroller = new DevicesController();

//role
// router.get('/:name',roleController.getRoleByName);
router.get('/', devicescontroller.getDevices);
router.get('/login/:tokenId',devicescontroller.checkUser)
router.post('/register',devicescontroller.registerUser)
// router.get('/fullList',roleController.getRolesWithPermissions)

// router.put('/',roleController.updateRole);devicesController

// router.post('/',roleController.createRole);

// router.delete('/',roleController.deleteRole);

module.exports = router;