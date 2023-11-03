'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReviewImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReviewImages.belongsTo(
        models.Review, {
          foreignKey: 'reviewId'
        }
      );
    }
  }
  ReviewImages.init({
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ReviewImages',
    scopes: {
      defaultScope: {
        attributes: {
          include: ['id', 'url']
        }
      }
    }
  });
  return ReviewImages;
};