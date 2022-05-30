// COLLECTS PACKAGED API ROUTES FROM CONTROLLERS/API/INDEX.JS //
const router = require('express').Router();

// ROUTE SCRIPTS
const apiRoutes = require('./api');

// PREFIXES FOR ROUTES
router.use('/api', apiRoutes);

// in case of request to non-existant endpoint, send 404
router.use((req, res) => {
    res.status(404).end();
});

const favoriteRoutes = require('./favorite-routes.js');

router.use('/favorites', favoriteRoutes);






// EXPORT 
module.exports = router;
