// PACKAGES ALL ROUTE MODULES //
const router = require('express').Router();

// IMPORT INDIVIDUAL ROUTE SCRIPTS
const projectRoutes = require('./project-routes');
const keywordRoutes = require('./keyword-routes');
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');
const favoritesRoutes = require('./favorites-routes.js');

// appends '/projects' to all PROJECT routes
router.use('/projects', projectRoutes);
// appends '/keywords' to all KEYWORD routes
router.use('/keywords', keywordRoutes);
// appends '/users' to all USER routes
router.use('/users', userRoutes);
// appends '/comments' to all COMMENT routes
router.use('/comments', commentRoutes);
// appends '/comments' to all FAVORITES routes
router.use('/favorites', favoritesRoutes);

// EXPORT
module.exports = router;