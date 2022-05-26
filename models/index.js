// IMPORT ALL MODEL FILES TO SET ASSOCIATIONS
const Project = require('./Project');
const Vote = require('./Vote');
const Keyword = require('./Keyword');
const ProjectKeyword = require('./ProjectKeyword');

// CONNET ONE USER TO MANY PROJECTS


// CONNET ONE PROJECT TO ONE USER

// CONNECT ONE USER TO MANY PROJECTS

// CONNECT ONE USER TO MANY PROJECTS THROUGH VOTE

// CONNECT ONE PROJECT TO MANY USERS THROUGH VOTE

// CONNECT ONE PROJECT TO MANY KEYWORDS THROUGH PROJECTKEYWORD

// CONNECT ONE KEYWORD TO MANY PROJECTS THROUGH PROJECTKEYWORD

// CONNECT ONE VOTE TO SINGLE USER

// CONNECT ONE VOTE TO SINGLE PROJECT
Vote.belongsTo(Project, {
    foreignKey: 'projectId'
});

// CONNECT ONE USER TO THEIR MANY VOTES


// CONNECT ONE PROJECT TO MANY VOTES
Project.hasMany(Vote, {
    foreignKey: 'projectId'
});

// CONNECT ONE COMMENT TO ONE USER

// CONNECT ONE COMMENT TO ONE PROJECT

// COMMENT ONE USER TO MANY COMMENTS
// User.hasMany(Comment, {
//     foreignKey: ''
// })

// CONNECT ONE POST TO MANY COMMENTS
// Project.hasMany(Comment, {
//     foreignKey: ''
// });

module.exports = { Project, Vote, Keyword, ProjectKeyword };