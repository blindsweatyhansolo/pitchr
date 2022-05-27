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
        project: {
            allownull: false,
            references: {
                project: '',
                key: ''
            }
        },
        creator: {
            allownull: false,
            reference: {
                creator: '',
                key: ''
            }
        }
    },
    {
        sequelize,
        Timestamps: true,
    }
)

module.exports = Comment;

// ID - INTEGER Cannot be NULL Primary Key Auto-Increment
// Text - TEXT Cannot be NULL
// Project- references Project model (foreign key) Cannot be NULL
// Creator - references User model (foreign key) Cannot be NULL
// Timestamps: TRUE