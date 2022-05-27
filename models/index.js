// IMPORT ALL MODEL FILES TO SET ASSOCIATIONS
const Project = require('./Project');
const Vote = require('./Vote');
const Keyword = require('./Keyword');
const ProjectKeyword = require('./ProjectKeyword');
const User = require('./User');

// CONNET ONE USER TO MANY PROJECTS
User.hasMany(Project, {
    foreignKey: 'creator'
});

// CONNET ONE PROJECT TO ONE USER
Project.belongsTo(User, {
    foreignKey: 'creator'
});

// CONNECT ONE USER TO MANY PROJECTS THROUGH VOTE
// User.belongsToMany(Project, {
//     through: Vote,
//     as: 'votedProject',
//     foreignKey:'creatorId'
// });

// // CONNECT ONE PROJECT TO MANY USERS THROUGH VOTE
// Project.belongsToMany(User, {
//     through: Vote,
//     as: 'votedProject',
//     foreignKey: 'projectId'
// });

// CONNECT ONE VOTE TO SINGLE USER
Vote.belongsTo(User, {
    foreignKey: 'creatorId'
});

// CONNECT ONE VOTE TO SINGLE PROJECT
Vote.belongsTo(Project, {
    foreignKey: 'projectId'
});

// CONNECT ONE USER TO THEIR MANY VOTES
User.hasMany(Vote, {
    foreignKey: 'creatorId'
});

// CONNECT ONE PROJECT TO MANY VOTES
Project.hasMany(Vote, {
    foreignKey: 'projectId'
});

// // CONNECT ONE PROJECT TO MANY KEYWORDS THROUGH PROJECTKEYWORD
// Project.belongsToMany(Keyword, {
//     through: ProjectKeyword,
//     foreignKey: 'projectId'
// });

// // CONNECT ONE KEYWORD TO MANY PROJECTS THROUGH PROJECTKEYWORD
// Keyword.belongsToMany(Project, {
//     through: ProjectKeyword,
//     foreignKey: 'keywordId'
// });

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

module.exports = { Project, Vote, Keyword, ProjectKeyword, User };