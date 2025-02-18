'use strict';
const { Model, Valdidator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Spot has many Bookings
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true,
      });
      // Spot has many Reviews
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId', 
        as: 'Reviews',
        onDelete: 'CASCADE',
        hooks: true,
      });
      // Spot has many Spot Images
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        as: 'SpotImages',
        onDelete: 'CASCADE',
        hooks: true,
      });
      // Spot belongs to User by id
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'Owner',
      })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User'
      },
      onDelete: 'CASCADE',
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: true, 
      validate: {
        min: -90,
        max: 90
      }
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: true,
      validate: {
        min: -180,
        max: 180
    }
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      }
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};