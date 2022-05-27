// PACKAGES ALL ROUTE MODULES //
const router = require('express').Router();

// IMPORT INDIVIDUAL ROUTE SCRIPTS
const projectRoutes = require('./project-routes');
const keywordRoutes = require('./keyword-routes');
const userRoutes = require('./user-routes');

// appends '/projects' to all PROJECT routes
router.use('/projects', projectRoutes);
// appends '/keywords' to all KEYWORD routes
router.use('/keywords', keywordRoutes);
// appends '/users' to all USER routes
router.use('/users', userRoutes);

// EXPORT
module.exports = router;