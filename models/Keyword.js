// KEYWORD MODEL
const { Model, DataTypes } = require('sequelize');

class Keyword extends Model {};

Keyword.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: false,
        modelName: 'keyword'
    }
);

module.exports = Keyword;