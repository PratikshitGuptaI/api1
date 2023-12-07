const express = require('express');
const router = express.Router();
const OfferController = require('../controllers/offerController');
const offercontroller = new OfferController();

//role
// router.get('/:name',roleController.getRoleByName);
router.get('/', offercontroller.getOffers);
// router.get('/fullList',roleController.getRolesWithPermissions)

// router.put('/',roleController.updateRole);

// router.post('/',roleController.createRole);

// router.delete('/',roleController.deleteRole);

module.exports = router;