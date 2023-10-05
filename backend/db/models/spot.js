 'use strict';
const { Model, Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.hasMany(
        models.Review, {
          // as: 'reviews',
          foreignKey: 'spotId',
          onDelete: 'CASCADE',
        }
      );
      Spot.hasMany(
        models.SpotImages, {
          foreignKey: 'spotId',
          onDelete: 'CASCADE',
        }
      );
      Spot.belongsTo(
        models.User, {
          foreignKey: 'ownerId',
          as: 'Owner'
        }
      );
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'City is required' },
        notNull: { msg: 'City is required' },
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'City is required' },
        notNull: { msg: 'City is required' },
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'City is required' },
        notNull: { msg: 'City is required' },
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'City is required' },
        notNull: { msg: 'City is required' },
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'City is required' },
        notNull: { msg: 'City is required' },
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'City is required' },
        notNull: { msg: 'City is required' },
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'City is required' },
        notNull: { msg: 'City is required' },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Description is required' },
        notNull: { msg: 'Description is required' },
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: { msg: 'Price per day is required' },
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',

  });
  return Spot;
};
