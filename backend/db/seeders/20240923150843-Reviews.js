'use strict';

const { Review } = require('../models');
const review = require('../models/review');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate(
      [
        {
          "userId": 1,
          "spotId": 2,
          "review": "Staying here was surreal! The views of marine life through the windows were breathtaking. ",
          "stars": 5,
        },
        {
          "userId": 1,
          "spotId": 6,
          "review": "A unique experience, but I did feel a bit isolated with no cell service. Still, worth a visit!",
          "stars": 4,
        }, 
        {
          "userId": 1,
          "spotId": 10,
          "review": "Fascinating location, though the pressure made my ears pop! Incredible sights underwater though.",
          "stars": 4,
        
        },
        {
          "userId": 2 ,
          "spotId": 1,
          "review": "The serenity of the ocean floor was like nothing I've ever experienced before. A true escape.",
          "stars": 5,
        },
      {
          "userId": 2 ,
          "spotId": 7,
          "review": "Waking up to schools of fish swimming past the windows was magical. Highly recommended!",
          "stars": 5,
        },
      {
          "userId": 2 ,
          "spotId": 18,
          "review": "If you want total peace, this is the place. The ocean views are unlike anything on land.",
          "stars": 5,
        },
        {
          "userId": 3 ,
          "spotId": 5,
          "review": "A stunning location, but I felt a little claustrophobic. Still, the underwater views were worth it.",
          "stars": 4,
        },
      {
          "userId": 3,
          "spotId": 15,
          "review": "The constant presence of sea creatures was mesmerizing! However, a bit too humid for my liking.",
          "stars": 5,
        },
      {
          "userId": 3,
          "spotId": 4,
          "review": "Fantastic! Felt like living in an aquarium, and the quiet was a perfect break from city noise. The place was clean and tidy when walking in",
          "stars": 5,
        },
        {
          "userId": 4,
          "spotId": 3,
          "review": "An unforgettable stay! Watching the coral reefs from my bedroom was a dream come true.",
          "stars": 4,
        },
        {
          "userId": 4,
          "spotId": 9,
          "review": "Unique, but you have to be prepared for the isolation. Definitely a one-of-a-kind experience though.",
          "stars": 4,
        },
        {
          "userId": 4,
          "spotId": 16,
          "review": "The tranquility of being underwater was perfect for relaxation. Great for those looking for peace.",
          "stars": 5,
        },
        {
          "userId": 5,
          "spotId": 8,
          "review": "Incredible! Watching sharks swim by while eating dinner was the highlight of my stay.",
          "stars": 5,
        },
        {
          "userId": 5,
          "spotId": 13,
          "review": "This was a great getaway, but the deep-sea pressure gave me a slight headache. Views were still worth it.",
          "stars": 5,
        },
        {
          "userId": 5,
          "spotId": 17,
          "review": "Loved the underwater setting! Felt like I was living in a documentary. Would definitely return.",
          "stars": 5,
        },
        {
          "userId": 6,
          "spotId": 4,
          "review": "Peaceful and surreal. Watching the ocean currents from the living room was mesmerizing. ",
          "stars": 5,
        },
        {
          "userId": 6,
          "spotId": 13,
          "review": "Amazing stay, but the humidity was higher than expected. Make sure to bring light clothing!",
          "stars": 5,
        }, 
        {
          "userId": 6,
          "spotId": 17,
          "review": "A once-in-a-lifetime experience! The view of the deep-sea creatures made every moment magical.",
          "stars": 5,
        },
        {
          "userId": 7,
          "spotId": 19,
          "review": "The place was surreal but it got a bit cold at night. Overall, the experience was unforgettable! ",
          "stars": 5,
        },
        {
          "userId": 8,
          "spotId": 14,
          "review": "A truly unique home! Being surrounded by coral and fish was the perfect escape from reality.",
          "stars": 4,
        }, 
        {
          "userId": 8,
          "spotId": 1,
          "review": "The serenity of the ocean floor was calming, but it did feel too isolated after a few days. This is best for shorter vacations or you should bring friends!",
          "stars": 4,
        },
        {
          "userId": 8,
          "spotId": 19,
          "review": "Living underwater was mesmerizing. Felt like I was part of the ocean, surrounded by incredible wildlife.",
          "stars": 5,
        },
        {
          "userId": 8,
          "spotId": 2,
          "review": "This stay was magical! Waking up to the underwater views was something I'll never forget.",
          "stars": 5,
        },
        {
          "userId": 9,
          "spotId": 4,
          "review": "Perfect for disconnecting from the hustle and bustle. The views of the deep sea are worth it!",
          "stars": 5,
        }, 
        {
          "userId": 9,
          "spotId": 14,
          "review": "Loved watching sea turtles from the living room. A peaceful place to unwind and disconnect.",
          "stars": 5,
        },
        {
          "userId": 9,
          "spotId": 20,
          "review": "A quiet retreat beneath the waves. Loved the silence and being completely surrounded by marine life.",
          "stars": 5,
        },
        {
          "userId": 9,
          "spotId": 7,
          "review": "Peaceful, beautiful, and unique. A great place to escape and reconnect with nature under the sea.",
          "stars": 5,
        }, 
        {
          "userId": 10,
          "spotId": 3,
          "review": "A quiet and peaceful retreat. Perfect for unwinding and enjoying marine life up close.",
          "stars": 5,
        },
        {
          "userId": 10,
          "spotId": 9,
          "review": "Amazing views, especially during the night with bioluminescent creatures lighting up the ocean!",
          "stars": 5,
        },
        {
          "userId": 10,
          "spotId": 12,
          "review": "Loved the solitude of being underwater. Wished there were more activities, but a perfect place to relax.",
          "stars": 5,
        },
        {
          "userId": 10,
          "spotId": 5,
          "review": "Waking up to the sight of manta rays gliding by was unforgettable. The house was well-kept and clean.",
          "stars": 5,
        }
      ], 
      { validate: true }
    )
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "options", // if there is a problem with reviews down replace this with option.
      {
        review: {
          [Op.in]: [
            'Staying here was surreal! The views of marine life through the windows were breathtaking.',
            'A unique experience, but I did feel a bit isolated with no cell service. Still, worth a visit!',
            'Fascinating location, though the pressure made my ears pop! Incredible sights underwater though.',
            "The serenity of the ocean floor was like nothing I've ever experienced before. A true escape.",
            "Waking up to schools of fish swimming past the windows was magical. Highly recommended!",
            "If you want total peace, this is the place. The ocean views are unlike anything on land.",
            "A stunning location, but I felt a little claustrophobic. Still, the underwater views were worth it.",
            "The constant presence of sea creatures was mesmerizing! However, a bit too humid for my liking.",
            "Fantastic! Felt like living in an aquarium, and the quiet was a perfect break from city noise. The place was clean and tidy when walking in",
            "An unforgettable stay! Watching the coral reefs from my bedroom was a dream come true.",
            "Unique, but you have to be prepared for the isolation. Definitely a one-of-a-kind experience though.",
            "The tranquility of being underwater was perfect for relaxation. Great for those looking for peace.",
            "Incredible! Watching sharks swim by while eating dinner was the highlight of my stay.",
            "This was a great getaway, but the deep-sea pressure gave me a slight headache. Views were still worth it.",
            "Loved the underwater setting! Felt like I was living in a documentary. Would definitely return.",
            "Peaceful and surreal. Watching the ocean currents from the living room was mesmerizing.",
            "Amazing stay, but the humidity was higher than expected. Make sure to bring light clothing!",
            "A once-in-a-lifetime experience! The view of the deep-sea creatures made every moment magical.",
            "The place was surreal but it got a bit cold at night. Overall, the experience was unforgettable! ",
            "A truly unique home! Being surrounded by coral and fish was the perfect escape from reality.",
            "The serenity of the ocean floor was calming, but it did feel too isolated after a few days. This is best for shorter vacations or you should bring friends!",
            "Living underwater was mesmerizing. Felt like I was part of the ocean, surrounded by incredible wildlife.",
            "This stay was magical! Waking up to the underwater views was something I'll never forget.",
            "Perfect for disconnecting from the hustle and bustle. The views of the deep sea are worth it!",
            "Loved watching sea turtles from the living room. A peaceful place to unwind and disconnect.",
            "A quiet retreat beneath the waves. Loved the silence and being completely surrounded by marine life.",
            "Peaceful, beautiful, and unique. A great place to escape and reconnect with nature under the sea.",
            "A quiet and peaceful retreat. Perfect for unwinding and enjoying marine life up close.",
            "Amazing views, especially during the night with bioluminescent creatures lighting up the ocean!",
            "Loved the solitude of being underwater. Wished there were more activities, but a perfect place to relax.",
            "Waking up to the sight of manta rays gliding by was unforgettable. The house was well-kept and clean.",
            
          ]
        }   
      }
    )
    
  }
};
