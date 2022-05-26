// PROJECTKEYWORD MODEL
// this model is necessary to properly assign mulitple keywords to
// a single project using the through() method in associations
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProjectKeyword extends Model {};

ProjectKeyword.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        projectId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'project',
                key: 'id'
            }
        },
        keywordId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'keyword',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: false,
        modelName: 'projectKeyword'
    }
);

module.exports = ProjectKeyword;