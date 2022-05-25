// PROJECT MODEL
const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class Project extends Model {};

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
            // foreign key association with user id
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        },
        value: {
            // true - closed, false - open
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        keyword: {
            // foreign key association with keyword id
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Keyword,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: false,
        modelName: 'project'
    }
);

module.exports = Project;