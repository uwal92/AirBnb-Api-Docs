'use strict';
const { Model, Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Bookings belong to User by id
      Booking.belongsTo(models.User, {
        foreignKey: 'userId',
        otherKey: 'id',
      });
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId', 
      })
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: 'Spots',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isFuture(value) {
          if (new Date(value) <= new Date()) {
            throw new Error('Start date must be in the future.');
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true, 
      validate: {
        isDate: true,
        isAfterStartDate(value) {
          if (new Date(value) <= new Date(this.startDate)) {
            throw new Error('End date must be after start date.');
          }
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};