const express = require('express');
const router = express.Router();
const role = require('../../middleware/role');
const middleware=require('../../middleware/admin.middleware');
const checkContract=require('../../middleware/checkingcontract.helper');
// const {
//     loginrequire,
// }=require('../../middleware/loginrequire.middleware');
const {
    verifyToken,
} = require('../../helper/jwt.helper');
router.use((req,res,next)=>{
    req.app.set('layout','admin');
    next();
});

// Token verification middleware
router.use((req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        const decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
        }
    }
    next();
});

// Set user information to locals
router.use((req, res, next) => {
    res.locals.user = req.user || null;
   // res.locals.rooms = Object.keys(req.app.locals.io.sockets.adapter.rooms);
    next();
});
// router.use(loginrequire);
router.use(role);

router.use((req,res,next)=>{
    middleware(req,res,next);
})

router.use(checkContract.checkContract);

router.use('/',require('./dashboard'));
router.use('/dashboard',require('./dashboard'));
router.use('/user',require('./user'));
router.use('/product',require('./product'));
router.use('/setting',require('./setting'));
router.use('/contact',require('./contact'));    
router.use('/contract',require('./contract'));
router.use('/news',require('./news'));
router.use('/category',require('./category'));
// router.use('/account',require('./account'));
// router.use('/least',require('./least'));
module.exports = router;
