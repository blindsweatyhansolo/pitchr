// PROJECT MODEL
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Project extends Model {
    // MODEL METHOD FOR VOTING
    // static indicates that the upvote() method is one based on Project model and not
    // an INSTANCE METHOD, allows us to use Project.upvote() as if it were one of Sequelize's
    // built-in methods, passing in the value of req.body as 'body' and an object of the
    // models as 'models'
    static upvote(body, models) {
        // using gathered values, create a new object in Vote model
        return models.Vote.create({
            userId : body.userId,
            projectId : body.projectId
        })
        .then(() => {
            // using the gathered projectId, find specified Project with findOne()
            // returning all defined attributes including sequelize.literal() of 
            // vote total as 'voteCount'
            return Project.findOne({
                where: {
                    id: body.projectId
                },
                attributes: [
                    'id',
                    'title',
                    'descriptionShort',
                    'descriptionLong',
                    'value',
                    'createdAt',
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM vote WHERE projectId = vote.projectId)'),
                        'voteCount'
                    ]
                ]
            });
        });
    }
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
        descriptionShort: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        descriptionLong: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userId: {
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