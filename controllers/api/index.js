// PACKAGES ALL ROUTE MODULES //
const router = require('express').Router();

// IMPORT INDIVIDUAL ROUTE SCRIPTS
const projectRoutes = require('./project-routes');
const keywordRoutes = require('./keyword-routes');

// appends '/projects' to all PROJECT routes
router.use('/projects', projectRoutes);
// appends '/keywords' to all KEYWORD routes
router.use('/keywords', keywordRoutes);

// EXPORT
module.exports = router;