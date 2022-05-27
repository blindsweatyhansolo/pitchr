// COMMENT MODEL

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allownull: false,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.STRING,
            allownull: false
        },
        projectId: {
            type: DataTypes.INTEGER,
            allownull: false,
            references: {
                model: 'project',
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allownull: false,
            reference: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        underscored: false,
        freezeTableName: true, //sequilize pluralizes model/table name
        modelName: 'comment'
    }
)

module.exports = Comment;

// ID - INTEGER Cannot be NULL Primary Key Auto-Increment
// Text - TEXT Cannot be NULL
// Project- references Project model (foreign key) Cannot be NULL
// Creator - references User model (foreign key) Cannot be NULL
// Timestamps: TRUE