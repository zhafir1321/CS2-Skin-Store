'use strict';
const { hash } = require('bcryptjs');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction, { foreignKey: 'BuyerId' });
    }
  }
  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Full name is required',
          },
          notNull: {
            msg: 'Full name is required',
          },
          is: {
            args: /^[A-Za-z\s]+$/i,
            msg: 'Full name must not contain any symbols and numbers',
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Username already taken',
        },
        validate: {
          notEmpty: {
            msg: 'Username is required',
          },
          notNull: {
            msg: 'Username is required',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Password is required',
          },
          notNull: {
            msg: 'Password is required',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Email already taken',
        },
        validate: {
          notNull: {
            msg: 'Email is required',
          },
          notEmpty: {
            msg: 'Email is required',
          },
          isEmail: {
            msg: 'Invalid Email',
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'Buyer',
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  User.beforeCreate((user) => {
    user.password = hash(user.password);
  });
  return User;
};
