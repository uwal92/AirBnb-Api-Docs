'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoReviewImages = [
  { reviewId: 1, images: [
      { url: "review1_image1.png" },
      { url: "review1_image2.png" }
  ]},
  { reviewId: 2, images: [
      { url: "review2_image1.png" },
      { url: "review2_image2.png" },
      { url: "review2_image3.png" }
  ]},
  { reviewId: 3, images: [
      { url: "review3_image1.png" }
  ]},
  { reviewId: 4, images: [
      { url: "review4_image1.png" },
      { url: "review4_image2.png" },
      { url: "review4_image3.png" },
      { url: "review4_image4.png" }
  ]},
  { reviewId: 5, images: [
      { url: "review5_image1.png" },
      { url: "review5_image2.png" }
  ]},
  { reviewId: 6, images: [
      { url: "review6_image1.png" }
  ]},
  { reviewId: 7, images: [
      { url: "review7_image1.png" },
      { url: "review7_image2.png" }
  ]},
  { reviewId: 8, images: [
      { url: "review8_image1.png" },
      { url: "review8_image2.png" },
      { url: "review8_image3.png" },
      { url: "review8_image4.png" }
  ]},
  { reviewId: 9, images: [
      { url: "review9_image1.png" },
      { url: "review9_image2.png" }
  ]}
];


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
    for (const reviewImage of demoReviewImages) {
      for (const image of reviewImage.images) {
        ReviewImage.create({
          reviewId: reviewImage.reviewId,
          url: image.url,
          preview: image.preview || false
        });
      }
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (const reviewImage of demoReviewImages) {
      for (const image of reviewImage.images) {
        ReviewImage.destroy({
          where: {
            reviewId: reviewImage.reviewId,
          }
        });
      }
    }
  }
};
