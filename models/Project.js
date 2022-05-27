// PROJECT MODEL
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const { User } = require('../models');

class Project extends Model {
    // MODEL METHOD FOR VOTING
    // static upvote(body, models) {
    //     return models.Vote.create({
    //         creatorId : body.creatorId,
    //         projectId : body.projectId
    //     })
    //     .then(() => {
    //         return Project.findOne({
    //             where: {
    //                 id: body.projectId
    //             },
    //             attributes: [
    //                 'id',
    //                 'title',
    //                 'description',
    //                 'creator',
    //                 [
    //                     sequelize.literal('(SELECT COUNT(*) FROM vote WHERE projectId = vote.projectId)'),
    //                     'voteCount'
    //                 ]
    //             ]
    //         });
    //     });
    // }
};

Project.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [4]
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        creator: {
            // UPDATE THIS AFTER USER MODEL CREATION
            // foreign key association with user id
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        value: {
            // true - closed, false - open
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        // KEYWORD FIELD IS NOW UNNECCESSARY, ASSOCIATION SET THROUGH ProjectKeyword MODEL
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: false,
        modelName: 'project'
    }
);

module.exports = Project;