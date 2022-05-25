// PROJECT MODEL
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
        // creator: {
            // UPDATE THIS AFTER USER MODEL CREATION
            // foreign key association with user id
            // type: DataTypes.INTEGER,
            // references: {
            //     model: User,
            //     key: 'id'
            // }
        // },
        value: {
            // true - closed, false - open
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        // keyword: {
            // UPDATE THIS AFTER KEYWORD MODEL CREATION
            // foreign key association with keyword id
            // type: DataTypes.INTEGER,
            // allowNull: true,
            // references: {
            //     model: Keyword,
            //     key: 'id'
            // }
        // }
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