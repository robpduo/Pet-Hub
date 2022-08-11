const router = require('express').Router();

const petRoutes = require('./pet-routes');

router.use('/pets', petRoutes);