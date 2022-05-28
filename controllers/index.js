// COLLECTS PACKAGED API ROUTES FROM CONTROLLERS/API/INDEX.JS //
const router = require('express').Router();

// ROUTE SCRIPTS
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// PREFIXES FOR ROUTES
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// in case of request to non-existant endpoint, send 404
router.use((req, res) => {
    res.status(404).end();
});

// EXPORT 
module.exports = router;
