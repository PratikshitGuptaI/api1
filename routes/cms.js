const express = require('express');
const router = express.Router();
const CmsController = require('../controllers/cmsController');
const cmsController = new CmsController();

router.get('/home/banners', cmsController.getHomeBanners);
router.get('/home/bottom', cmsController.getHomeBottomSection);
router.post('/home/banners',cmsController.createHomeBanner)
router.delete('/home/banners/:id',cmsController.deleteHomeBanner)
// router.get('/items', invoiceController.getInvoiceItems);
// router.get('/actionsList', moduleController.getModuleActions);


module.exports = router;