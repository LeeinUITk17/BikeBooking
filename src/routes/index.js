var express = require('express');
var router = express.Router();
router.use('/admin', require('./admin'));
 router.use('/',require('./product'));
module.exports = router;
