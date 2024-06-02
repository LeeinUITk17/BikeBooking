const express = require('express');
const router = express.Router();
const middleware = require('../../middleware/product.middleware');


router.use((req, res, next) => {
    if (req.baseUrl !== '/login') {
        middleware(req, res, next);
    } else {
        next();
    }
});


const routes = [
    { path: '/home', layout: 'guestmode/home', handler: require('./home') },
    { path: '/about', layout: 'guestmode/about', handler: require('./about') },
    { path: '/contact', layout: 'guestmode/contact', handler: require('./contact') },
    { path: '/shop', layout: 'guestmode/shop', handler: require('./shop') },
    { path: '/blog', layout: 'guestmode/blog', handler: require('./blog') },
];

routes.forEach(route => {
    router.use(route.path, (req, res, next) => {
        req.app.set('layout', route.layout);
        next();
    }, route.handler);
});


router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Login require!');
});

module.exports = router;
