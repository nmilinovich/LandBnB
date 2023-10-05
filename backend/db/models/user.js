'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(
        models.Spot, {
          foreignKey: 'ownerId',
          onDelete: 'CASCADE',
        }
      );
      User.hasMany(
        models.Booking, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        }
      );
      User.hasMany(
        models.Review, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        }
      );
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "First Name is required"},
        notEmpty: {msg: "First Name is required"}
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Last Name is required"},
        notNull: {msg: "Last Name is required"},
        
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {msg: "Username is required"},
        notEmpty: {msg: "Username is required"},
        len: [4,30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email");
          }
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: {msg: "Invalid email"}
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60],
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    scopes: {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
        }
      },
    },
  });
  return User;
};
