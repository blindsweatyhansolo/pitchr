// IMPORT ALL MODEL FILES TO SET ASSOCIATIONS
const Project = require('./Project');
const Vote = require('./Vote');
const Keyword = require('./Keyword');
const ProjectKeyword = require('./ProjectKeyword');
const User = require('./User');
const Comment = require('./Comment');

// CONNET ONE USER TO MANY PROJECTS
User.hasMany(Project, {
    foreignKey: 'userId'
});

// CONNET ONE PROJECT TO ONE USER
Project.belongsTo(User, {
    foreignKey: 'userId'
});

// CONNECT ONE USER TO MANY PROJECTS THROUGH VOTE
// as: 'votedProject' used as the name of the Vote model when queried on
User.belongsToMany(Project, {
    through: Vote,
    as: 'votedProject',
    foreignKey:'userId'
});

// // CONNECT ONE PROJECT TO MANY USERS THROUGH VOTE
// as: 'votedProject' used as the name of the Vote model when queried on
Project.belongsToMany(User, {
    through: Vote,
    as: 'votedProject',
    foreignKey: 'projectId'
});

// CONNECT ONE VOTE TO SINGLE USER
Vote.belongsTo(User, {
    foreignKey: 'userId'
});

// CONNECT ONE VOTE TO SINGLE PROJECT
Vote.belongsTo(Project, {
    foreignKey: 'projectId'
});

// CONNECT ONE USER TO THEIR MANY VOTES
User.hasMany(Vote, {
    foreignKey: 'userId'
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
Comment.belongsTo(User, {
    foreignKey: 'userId'
});

// CONNECT ONE COMMENT TO ONE PROJECT
Comment.belongsTo(Project, {
    foreignKey: 'projectId'
});

// COMMENT ONE USER TO MANY COMMENTS
User.hasMany(Comment, {
    foreignKey: 'userId'
});

// CONNECT ONE POST TO MANY COMMENTS
Project.hasMany(Comment, {
    foreignKey: 'projectId'
});

module.exports = { Project, Vote, Keyword, ProjectKeyword, User, Comment };