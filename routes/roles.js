const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/roleController');
const roleController = new RoleController();

//role
// router.get('/:name',roleController.getRoleByName);
router.get('/list', roleController.getRoles);
router.get('/fullList',roleController.getRolesWithPermissions)
router.get('/permissions/:roleid',roleController.getRolesWithPermissionsById)
router.put('/',roleController.updateRole);

router.post('/',roleController.createRole);

router.delete('/:roleId',roleController.deleteRole);

module.exports = router;
