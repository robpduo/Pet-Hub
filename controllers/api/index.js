const router = require('express').Router();

const petRoutes = require('./pet-routes');
const userRoutes = require('./user-routes.js');

router.use('/pets', petRoutes);
router.use('/users', userRoutes);




module.exports = router;