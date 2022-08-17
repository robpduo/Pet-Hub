const router = require('express').Router();

const apiRoutes = require('./api');
router.use('/api', apiRoutes);

const homeRoutes = require('./home-routes.js');
router.use('/', homeRoutes);
const placesRoutes = require('./places-routes.js');
router.use('/places', placesRoutes);

router.use((req, res) => {
    res.status(404).end();
  });
  

module.exports = router;