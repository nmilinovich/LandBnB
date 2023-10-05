'use strict';
const { Model, Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SpotImages.belongsTo(
        models.Spot, {
          foreignKey: 'spotId',
        }
      );
    }
  }
  SpotImages.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'SpotImages',
    defaultScope: {
      attributes: {
        exclude: ['spotId', 'createdAt', 'updatedAt'],
      }
    }
  });
  return SpotImages;
};