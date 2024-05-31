const express = require('express');
const router = express.Router();
const flash = require("express-flash-notification");
const role = require('../../middleware/role');
const middleware = require('../../middleware/product.middleware');
const {
    verifyToken,
} = require('../../helper/jwt.helper');
const {
    loginrequire
}=require('../../middleware/loginrequire.middleware');
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
    //console.log(req.user);
    next();
});

// Middleware to handle product-related operations
router.use((req, res, next) => {
    if (req.baseUrl !== '/login') {
        middleware(req, res, next);
    } else {
        next();
    }
});

// // Flash messages setup
router.use('/login', (req, res, next) => {
    req.app.set('layout', 'login');
    next();
}, require('./login'));

router.use(loginrequire);

// Setting layout and handling routes
const routes = [
    { path: '/home', layout: 'home', handler: require('./home') },
    { path: '/about', layout: 'about', handler: require('./about') },
    { path: '/contact', layout: 'contact', handler: require('./contact') },
    { path: '/profile', layout: 'profile', handler: require('./profile') },
    { path: '/shop', layout: 'shop', handler: require('./shop') },
    { path: '/contract', layout: 'contract', handler: require('./contract') },
    { path: '/least', layout: 'least', handler: require('./least') },
    { path: '/blog', layout: 'blog', handler: require('./blog') },
    { path: '/vehicle', layout: 'vehicle', handler: require('./vehicle') },
    { path:'/chat',layout: 'chat', handler: require('./chat')}
];

routes.forEach(route => {
    router.use(route.path, (req, res, next) => {
        req.app.set('layout', route.layout);
        next();
    }, route.handler);
});

// Role-based access control
router.use(role);

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Login require!');
});

module.exports = router;
