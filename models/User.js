// USER MODEL
const sequelize = require("../config/connection");
const {Model, DataTypes} = require("sequelize");
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw) {
        // set up method to run on instance data (per user) to check password
        return bcrypt.compareSync(loginPw, this.password);
      }
};

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
        hooks: {
            async beforeCreate(newUserData) {
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
              return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password,10);
              return updatedUserData;
            }
          },

        sequelize,
        timestamps: false,
        freezeTableName: true, //sequilize pluralizes model/table name
        underscored: false,
        modelName: 'user',
    }
);

module.exports = User;