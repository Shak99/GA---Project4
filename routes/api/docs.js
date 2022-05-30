const express = require('express');
const router = express.Router();
const docsCtrl = require('../../controllers/docs');
const multer  = require('multer')
const upload = multer(); // <- handles multipart/formdata requests(photos)
// /*---------- Public Routes ----------*/
router.post('/', upload.single('document'), docsCtrl.create);
router.get('/', docsCtrl.index)
router.delete('/:id', docsCtrl.removeDoc)


/*---------- Protected Routes ----------*/
function isLoggedIn(req, res, next){
    if(req.user) next()
    res.status(401).json({data: 'not authorized! Please Log In'})
}
module.exports = router;