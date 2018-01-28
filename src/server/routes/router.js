const Router = require('express').Router;
const authRoutes = require('./auth.js');


let router = Router();


router.get('/auth/callback', authRoutes.callback);
router.get('/auth', authRoutes.auth);

module.exports = router;

