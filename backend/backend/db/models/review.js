'use strict';
const { Model, Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Review belongs to Spot by id
      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId',
      });
      // Review belongs to User by id
      Review.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      // Review has many review images by reviewId
      Review.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId', 
        onDelete: 'CASCADE',
        hooks: true,
      })
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Spots',
      },
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 5,
      }
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};