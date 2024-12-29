"use strict";

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "/Images/House1/kitchen 12.png",
          preview: true,
        },
        {
          spotId: 1,
          url: "/Images/House1/house1.png",
          preview: false,
        },
        {
          spotId: 1,
          url: "/Images/House1/bedroom 4.png",
          preview: false,
        },
        {
          spotId: 1,
          url: "/Images/House1/Dinning room.png",
          preview: false,
        },
        {
          spotId: 1,
          url: "/Images/House1/bathroom 2.png",
          preview: false,
        },
        {
          spotId: 2,
          url: "/Images/House2/House2.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "/Images/House2/bathroom 1.png",
          preview: false,
        },
        {
          spotId: 2,
          url: "/Images/House2/kids room.png",
          preview: false,
        },
        {
          spotId: 2,
          url: "/Images/House2/kitchen 9.png",
          preview: false,
        },
        {
          spotId: 2,
          url: "/Images/House2/laundry.png",
          preview: false,
        },
        {
          spotId: 3,
          url: "/Images/House3/dinning room 5.png",
          preview: true,
        },
        {
          spotId: 3,
          url: "/Images/House3/bathrooom 6.png",
          preview: false,
        },
        {
          spotId: 3,
          url: "/Images/House3/Bedroom.png",
          preview: false,
        },
        {
          spotId: 3,
          url: "/Images/House3/House3.png",
          preview: false,
        },
        {
          spotId: 3,
          url: "/Images/House3/kitchen 7.png",
          preview: false,
        },
        {
          spotId: 4,
          url: "/Images/House4/livingroom 2.png",
          preview: true,
        },
        {
          spotId: 4,
          url: "/Images/House4/bathroom.png",
          preview: false,
        },
        {
          spotId: 4,
          url: "/Images/House4/bedroom 3.png",
          preview: false,
        },
        {
          spotId: 4,
          url: "/Images/House4/kitchen 14.png",
          preview: false,
        },
        {
          spotId: 4,
          url: "/Images/House4/office.png",
          preview: false,
        },
        {
          spotId: 5,
          url: "/Images/House5/kitchen 15.png",
          preview: true,
        },
        {
          spotId: 5,
          url: "/Images/House5/bedroom.png",
          preview: false,
        },
        {
          spotId: 5,
          url: "/Images/House5/closet.png",
          preview: false,
        },
        {
          spotId: 5,
          url: "/Images/House5/dinning room 4.png",
          preview: false,
        },
        {
          spotId: 5,
          url: "/Images/House5/livingroom6.png",
          preview: false,
        },
        {
          spotId: 6,
          url: "/Images/House6/library.png",
          preview: true,
        },
        {
          spotId: 6,
          url: "/Images/House6/bedroom 2.png",
          preview: false,
        },
        {
          spotId: 6,
          url: "/Images/House6/closet.png",
          preview: false,
        },
        {
          spotId: 6,
          url: "/Images/House6/kitchen 6.png",
          preview: false,
        },
        {
          spotId: 6,
          url: "/Images/House6/livingroom 11.png",
          preview: false,
        },
        {
          spotId: 7,
          url: "/Images/House7/closet 2.png",
          preview: true,
        },
        {
          spotId: 7,
          url: "/Images/House7/bathroom.png",
          preview: false,
        },
        {
          spotId: 7,
          url: "/Images/House7/Dinning room 1.png",
          preview: false,
        },
        {
          spotId: 7,
          url: "/Images/House7/kitchen 11.png",
          preview: false,
        },
        {
          spotId: 7,
          url: "/Images/House7/laundry.png",
          preview: false,
        },
        {
          spotId: 8,
          url: "/Images/House8/livingroom.png",
          preview: true,
        },
        {
          spotId: 8,
          url: "/Images/House8/bedroom.png",
          preview: false,
        },
        {
          spotId: 8,
          url: "/Images/House8/kids room 3.png",
          preview: false,
        },
        {
          spotId: 8,
          url: "/Images/House8/kitchen-dinning 1.png",
          preview: false,
        },
        {
          spotId: 8,
          url: "/Images/House8/office 1.png",
          preview: false,
        },
        {
          spotId: 9,
          url: "/Images/House9/kids room 1.png",
          preview: true,
        },
        {
          spotId: 9,
          url: "/Images/House9/bed.png",
          preview: false,
        },
        {
          spotId: 9,
          url: "/Images/House9/closet.png",
          preview: false,
        },
        {
          spotId: 9,
          url: "/Images/House9/kitcehn 4.png",
          preview: false,
        },
        {
          spotId: 9,
          url: "/Images/House9/livingroom 1.png",
          preview: false,
        },
        {
          spotId: 10,
          url: "/Images/House10/pool.png",
          preview: true,
        },
        {
          spotId: 10,
          url: "/Images/House10/bar 1.png",
          preview: false,
        },
        {
          spotId: 10,
          url: "/Images/House10/bathroom 5.png",
          preview: false,
        },
        {
          spotId: 10,
          url: "/Images/House10/game room.png",
          preview: false,
        },
        {
          spotId: 10,
          url: "/Images/House10/livingroom 3.png",
          preview: false,
        },
        {
          spotId: 11,
          url: "/Images/House11/livingroom 9.png",
          preview: true,
        },
        {
          spotId: 11,
          url: "/Images/House11/bathroom 9.png",
          preview: false,
        },
        {
          spotId: 11,
          url: "/Images/House11/bedroom 14.png",
          preview: false,
        },
        {
          spotId: 11,
          url: "/Images/House11/closet 3.png",
          preview: false,
        },
        {
          spotId: 11,
          url: "/Images/House11/kitchen17.png",
          preview: false,
        },
        {
          spotId: 12,
          url: "/Images/House12/bedroom 17.png",
          preview: true,
        },
        {
          spotId: 12,
          url: "/Images/House12/bathroom 7.png",
          preview: false,
        },
        {
          spotId: 12,
          url: "/Images/House12/closet 1.png",
          preview: false,
        },
        {
          spotId: 12,
          url: "/Images/House12/dinning room 9.png",
          preview: false,
        },
        {
          spotId: 12,
          url: "/Images/House12/kitchen 3.png",
          preview: false,
        },
        {
          spotId: 13,
          url: "/Images/House13/livingroom 16.png",
          preview: true,
        },
        {
          spotId: 13,
          url: "/Images/House13/bar.png",
          preview: false,
        },
        {
          spotId: 13,
          url: "/Images/House13/kitchen 18.png",
          preview: false,
        },
        {
          spotId: 13,
          url: "/Images/House13/unnamed (25).png",
          preview: false,
        },
        {
          spotId: 13,
          url: "/Images/House13/dinning room 6.png",
          preview: false,
        },
        {
          spotId: 14,
          url: "/Images/House14/bedroom 7.png",
          preview: true,
        },
        {
          spotId: 14,
          url: "/Images/House14/bedroom 5.png",
          preview: false,
        },
        {
          spotId: 14,
          url: "/Images/House14/dinning room 3.png",
          preview: false,
        },
        {
          spotId: 14,
          url: "/Images/House14/kitchen 19.png",
          preview: false,
        },
        {
          spotId: 14,
          url: "/Images/House14/unnamed.png",
          preview: false,
        },
        {
          spotId: 15,
          url: "/Images/House15/livingroom 15.png",
          preview: true,
        },
        {
          spotId: 15,
          url: "/Images/House15/bathroom 18.png",
          preview: false,
        },
        {
          spotId: 15,
          url: "/Images/House15/closet.png",
          preview: false,
        },
        {
          spotId: 15,
          url: "/Images/House15/kitchen 16.png",
          preview: false,
        },
        {
          spotId: 15,
          url: "/Images/House15/bedroom 18.png",
          preview: false,
        },
        {
          spotId: 16,
          url: "/Images/House16/dinning room 7.png",
          preview: true,
        },
        {
          spotId: 16,
          url: "/Images/House16/bathroom 8.png",
          preview: false,
        },
        {
          spotId: 16,
          url: "/Images/House16/bedroom 13.png",
          preview: false,
        },
        {
          spotId: 16,
          url: "/Images/House16/library 3.png",
          preview: false,
        },
        {
          spotId: 16,
          url: "/Images/House16/livingroom 6.png",
          preview: false,
        },
        {
          spotId: 17,
          url: "/Images/House17/office 3.png",
          preview: true,
        },
        {
          spotId: 17,
          url: "/Images/House17/bathroom 4.png",
          preview: false,
        },
        {
          spotId: 17,
          url: "/Images/House17/bedroom 9.png",
          preview: false,
        },
        {
          spotId: 17,
          url: "/Images/House17/dinning room 11.png",
          preview: false,
        },
        {
          spotId: 17,
          url: "/Images/House17/livingroom 18.png",
          preview: false,
        },
        {
          spotId: 18,
          url: "/Images/House18/livingroom 4.png",
          preview: true,
        },
        {
          spotId: 18,
          url: "/Images/House18/bathroom 12.png",
          preview: false,
        },
        {
          spotId: 18,
          url: "/Images/House18/bedroom 16.png",
          preview: false,
        },
        {
          spotId: 18,
          url: "/Images/House18/office 2.png",
          preview: false,
        },
        {
          spotId: 18,
          url: "/Images/House18/kitchen 8.png",
          preview: false,
        },
        {
          spotId: 19,
          url: "/Images/House19/livingroom 14.png",
          preview: true,
        },
        {
          spotId: 19,
          url: "/Images/House19/bathroom 16.png",
          preview: false,
        },
        {
          spotId: 19,
          url: "/Images/House19/bedroom 8.png",
          preview: false,
        },
        {
          spotId: 19,
          url: "/Images/House19/hotub.png",
          preview: false,
        },
        {
          spotId: 19,
          url: "/Images/House19/dinning room  8.png", 
          preview: false,
        },
        {
          spotId: 20,
          url: "/Images/House20/dinning room 10.png",
          preview: true,
        },
        {
          spotId: 20,
          url: "/Images/House20/bathroom 14.png",
          preview: false,
        },
        {
          spotId: 20,
          url: "/Images/House20/bedroom 10.png",
          preview: false,
        },
        {
          spotId: 20,
          url: "/Images/House20/closet 4.png",
          preview: false,
        },
        {
          spotId: 20,
          url: "/Images/House20/livingroom 18.png",
          preview: false,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        url: {
          [Op.in]: [
            "/Images/House1/bathroom 2.png",
            "/Images/House1/bedroom 4.png",
            "/Images/House1/Dinning room.png",
            "/Images/House1/house1.png",
            "/Images/House1/kitchen 12.png",
            "/Images/House2/bathroom 1.png",
            "/Images/House2/House2.jpg",
            "/Images/House2/kids room.png",
            "/Images/House2/kitchen 9.png",
            "/Images/House2/laundry.png",
            "/Images/House3/bathrooom 6.png",
            "/Images/House3/Bedroom.png",
            "/Images/House3/dinning room 5.png",
            "/Images/House3/House3.png",
            "/Images/House3/kitchen 7.png",
            "/Images/House4/bathroom.png",
            "/Images/House4/bedroom 3.png",
            "/Images/House4/kitchen 14.png",
            "/Images/House4/livingroom 2.png",
            "/Images/House4/office.png",
            "/Images/House5/bedroom.png",
            "/Images/House5/closet.png",
            "/Images/House5/dinning room 4.png",
            "/Images/House5/kitchen 15.png",
            "/Images/House5/livingroom6.png",
            "/Images/House6/bedroom 2.png",
            "/Images/House6/closet.png",
            "/Images/House6/kitchen 6.png",
            "/Images/House6/library.png",
            "/Images/House6/livingroom 11.png",
            "/Images/House7/bathroom.png",
            "/Images/House7/closet 2.png",
            "/Images/House7/Dinning room 1.png",
            "/Images/House7/kitchen 11.png",
            "/Images/House7/laundry.png",
            "/Images/House8/bedroom.png",
            "/Images/House8/kids room 3.png",
            "/Images/House8/kitchen-dinning 1.png",
            "/Images/House8/livingroom.png",
            "/Images/House8/office 1.png",
            "/Images/House9/bed.png",
            "/Images/House9/closet.png",
            "/Images/House9/kids room 1.png",
            "/Images/House9/kitcehn 4.png",
            "/Images/House9/livingroom 1.png",
            "/Images/House10/bar 1.png",
            "/Images/House10/bathroom 5.png",
            "/Images/House10/game room.png",
            "/Images/House10/livingroom 3.png",
            "/Images/House10/pool.png",
            "/Images/House11/bathroom 9.png",
            "/Images/House11/bedroom 14.png",
            "/Images/House11/closet 3.png",
            "/Images/House11/kitchen 17.png",
            "/Images/House11/livingroom 9.png",
            "/Images/House12/bathroom 7.png",
            "/Images/House12/.bedroom 17png",
            "/Images/House12/closet 1.png",
            "/Images/House12/dinning room 9.png",
            "/Images/House12/kitchen 3.png",
            "/Images/House13/bar.png",
            "/Images/House13/dinning room 6.png",
            "/Images/House13/kitchen 18.png",
            "/Images/House13/livingroom 16.png",
            "/Images/House13/unnamed (25).png",
            "/Images/House14/bedroom 5.png",
            "/Images/House14/bedroom 7.png",
            "/Images/House14/dinning room 3.png",
            "/Images/House14/kitchen 19.png",
            "/Images/House14/unnamed.png",
            "/Images/House15/bathroom 11.png",
            "/Images/House15/bedroom 18.png",
            "/Images/House15/closet.png",
            "/Images/House15/kitchen 16.png",
            "/Images/House15/livingroom 15.png",
            "/Images/House16/bathroom 8.png",
            "/Images/House16/bedroom 13.png",
            "/Images/House16/dinning room 7.png",
            "/Images/House16/library 3.png",
            "/Images/House16/livingroom 6.png",
            "/Images/House17/bathroom 4.png",
            "/Images/House17/bedroom 9.png",
            "/Images/House17/dinning room 11.png",
            "/Images/House17/livingroom 18.png",
            "/Images/House17/office 3.png",
            "/Images/House18/bathroom 12.png",
            "/Images/House18/bedroom 16.png",
            "/Images/House18/kitchen 8.png",
            "/Images/House18/livingroom 4.png",
            "/Images/House18/office 2.png",
            "/Images/House19/bathroom 16.png",
            "/Images/House19/bedroom 8.png",
            "/Images/House19/dinning room  8.png",
            "/Images/House19/hotub.png",
            "/Images/House19/livingroom 14.png",
            "/Images/House20/bathroom 14.png",
            "/Images/House20/bedroom 10.png",
            "/Images/House20/closet 4.png",
            "/Images/House20/dinning room 10.png",
            "/Images/House20/livingroom 18.png",
          ],
        },
      },
      {}
    );
  },
};
