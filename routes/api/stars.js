const express = require('express');
const router = express.Router();
const starsCtrl = require('../../controllers/stars')

router.post('/docs/:id/star', starsCtrl.create)
router.delete('/star/:id', starsCtrl.deleteStar)

module.exports = router;