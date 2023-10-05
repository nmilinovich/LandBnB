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
        notEmpty: { msg: 'Street address is required' },
        notNull: { msg: 'Street address is required' },
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
        notEmpty: { msg: 'State is required' },
        notNull: { msg: 'State is required' },
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Country is required' },
        notNull: { msg: 'Country is required' },
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isNumeric: { msg: 'Latitude is not valid' },
        notNull: { msg: 'Latitude is not valid' },
        max: {args: 180, msg: 'Latitude is not valid'},
        min: {args: -180, msg: 'Latitude is not valid'},
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isNumeric: { msg: 'Longitude is not valid' },
        notNull: { msg: 'Longitude is not valid' },
        max: {args: 180, msg: 'Longitude is not valid'},
        min: {args: -180, msg: 'Longitude is not valid'},
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        len: { args: [1, 50], msg: 'Name must be less than 50' },
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
        isNumeric: { msg: 'Price per day is required' },
        min: { args: 0.01, msg: 'Price per day is required' },
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',

  });
  return Spot;
};
