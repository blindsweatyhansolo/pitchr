// PACKAGES ALL ROUTE MODULES //
const router = require('express').Router();

// IMPORT INDIVIDUAL ROUTE SCRIPTS
const projectRoutes = require('./project-routes');

// appends '/projects' to all PROJECT routes
router.use('/projects', projectRoutes);

// EXPORT
module.exports = router;