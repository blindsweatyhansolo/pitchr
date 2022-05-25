// USER MODEL

const sequelize = require("../config/connection");
const {Model, DataTypes} = require("sequelize");
class User extends Model {};


User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        },

        github: {
            type: DataTypes.STRING,
            unique: true
        },

    }, 
    {
        sequelize,
        timestamps: false,
        freezeTableName: false, //sequilize pluralizes model/table name
        underscored: false,
        modelName: 'user'
    }

);

module.exports = User;