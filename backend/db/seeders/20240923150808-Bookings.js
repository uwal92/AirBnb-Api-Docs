'use strict';
const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await Booking.bulkCreate([
    {
      spotId: 1,
      userId: 2,
      startDate: "2025-11-19",
      endDate: "2025-11-20"
    },
    {
      spotId: 2,
      userId: 3,
      startDate: "2025-01-16",
      endDate: "2025-01-18"
    },
    {
      spotId: 3,
      userId: 1,
      startDate: "2025-03-05",
      endDate: "2025-03-10"
    },
    {
      spotId: 4,
      userId: 2,
      startDate: "2025-04-01",
      endDate: "2025-04-05"
    }
  ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, {
      spotId: [1, 2, 3, 4]
    }, {});
  }
};
