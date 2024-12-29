"use strict";

const { Spot } = require("../models");
const spot = require("../models/spot");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "123 Coral Reef",
          city: "Atlantis",
          state: "Oceanic Depths",
          country: "Atlantic Ocean",
          lat: 31.559,
          lng: -23.6338,
          name: "Poseidon's Palace",
          description:
            "A grand underwater palace with coral pillars and seaweed curtains, fit for ocean royalty.",
          price: 400,
          avgRating: 4.9,
          previewImage: "/Images/House1/kitchen 12.png",
        },
        {
          ownerId: 2,
          address: "456 Seahorse St.",
          city: "Pacific Basin",
          state: "Oceanic Depths",
          country: "Pacific Ocean",
          lat: -23.4581,
          lng: -149.7766,
          name: "Seahorse Sanctuary",
          description:
            "An intimate retreat where you can swim with seahorses and relax in tranquility.",
          price: 220,
          avgRating: 4.7,
          previewImage: "/Images/House2/House2.jpg",
        },
        {
          ownerId: 3,
          address: "789 Jellyfish Ave",
          city: "Great Barrier",
          state: "Coral Kingdom",
          country: "Indian Ocean",
          lat: -18.2871,
          lng: 147.6992,
          name: "Jellyfish Jungle",
          description:
            "A magical home surrounded by gentle, glowing jellyfish, offering an otherworldly experience.",
          price: 300,
          avgRating: 4.8,
          previewImage: "/Images/House3/dinning room 5.png'",
        },
        {
          ownerId: 4,
          address: "101 Shark Bay",
          city: "Fiji",
          state: "Blue Depths",
          country: "South Pacific Ocean",
          lat: -17.7134,
          lng: 178.065,
          name: "Shark's Cove",
          description:
            "Stay safely in an enclosed underwater cove while observing majestic sharks in their natural habitat.",
          price: 350,
          avgRating: 4.6,
          previewImage: "/Images/House4/livingroom 2.png",
        },
        {
          ownerId: 5,
          address: "202 Whale Road",
          city: "Greenland Waters",
          state: "Arctic Depths",
          country: "North Atlantic Ocean",
          lat: 72.5796,
          lng: -38.3156,
          name: "Whale Watch Retreat",
          description:
            "A peaceful underwater house where you can watch whales swim by your window in a serene icy environment.",
          price: 275,
          avgRating: 4.9,
          previewImage: "/Images/House5/kitchen 15.png",
        },
        {
          ownerId: 6,
          address: "303 Starfish Dr.",
          city: "Maldives",
          state: "Coral Gardens",
          country: "Indian Ocean",
          lat: 3.2028,
          lng: 73.2207,
          name: "Starfish Sanctuary",
          description:
            "Immerse yourself in a colorful world of starfish and coral, perfect for an oceanic getaway.",
          price: 250,
          avgRating: 4.7,
          previewImage: "/Images/House6/library.png",
        },
        {
          ownerId: 7,
          address: "404 Octopus Way",
          city: "Bora Bora",
          state: "Deep Reefs",
          country: "Pacific Ocean",
          lat: -16.5004,
          lng: -151.7415,
          name: "Octopus Hideaway",
          description:
            "Live among the intelligent octopus in this cozy and fascinating underwater sanctuary.",
          price: 290,
          avgRating: 4.5,
          previewImage: "/Images/House7/closet 2.png",
        },
        {
          ownerId: 1,
          address: "505 Manta Ray Blvd",
          city: "Caribbean Sea",
          state: "Oceanic Paradise",
          country: "Caribbean",
          lat: 15.8997,
          lng: -77.9164,
          name: "Manta Ray Manor",
          description:
            "Glide through clear waters alongside graceful manta rays in this luxurious underwater home.",
          price: 500,
          avgRating: 5.0,
          previewImage: "/Images/House8/livingroom.png",
        },
        {
          ownerId: 2,
          address: "606 Dolphin Ln.",
          city: "Bahamas",
          state: "Crystal Waters",
          country: "North Atlantic Ocean",
          lat: 25.0343,
          lng: -77.3963,
          name: "Dolphin Dive",
          description:
            "Dive into the world of playful dolphins at this vibrant underwater home.",
          price: 320,
          avgRating: 4.8,
          previewImage: "/Images/House9/kids room 1.png",
        },
        {
          ownerId: 3,
          address: "707 Kraken Ct.",
          city: "Mediterranean",
          state: "Sunken Depths",
          country: "Mediterranean Sea",
          lat: 35.2033,
          lng: 18.3949,
          name: "Kraken's Lair",
          description:
            "An adventurous home for those brave enough to stay near the legendary Kraken’s domain.",
          price: 450,
          avgRating: 4.7,
          previewImage: "/Images/House10/pool.png",
        },
        {
    ownerId: 4,
    address: "808 Coral Cliff",
    city: "Hawaiian Ridge",
    state: "Pacific Heights",
    country: "Pacific Ocean",
    lat: 19.8968,
    lng: -155.5828,
    name: "Turtle Tides",
    description:
      "Relax with the ancient sea turtles as they glide by this peaceful underwater retreat.",
    price: 375,
    avgRating: 4.8,
    previewImage: "/Images/House11/livingroom 9.png",
  },
  {
    ownerId: 5,
    address: "909 Anemone Ave",
    city: "Red Sea",
    state: "Coral Caves",
    country: "Red Sea",
    lat: 20.5921,
    lng: 39.8255,
    name: "Anemone Abode",
    description:
      "Experience vibrant sea life as clownfish dart through colorful anemones surrounding your home.",
    price: 280,
    avgRating: 4.7,
    previewImage: "/Images/House12/bedroom 17.png",
  },
  {
    ownerId: 6,
    address: "1010 Pearl Path",
    city: "Java Trench",
    state: "Deep Abyss",
    country: "Indian Ocean",
    lat: -7.2454,
    lng: 112.7378,
    name: "Pearl Paradise",
    description:
      "An elegant home nestled in a trench, where shimmering pearls light up the darkness.",
    price: 420,
    avgRating: 4.9,
    previewImage: "/Images/House13/livingroom 16.png",
  },
  {
    ownerId: 7,
    address: "111 Coral Gardens",
    city: "Maui",
    state: "Tropical Shores",
    country: "Pacific Ocean",
    lat: 20.7984,
    lng: -156.3319,
    name: "Coral Reef Cottage",
    description:
      "A charming cottage surrounded by coral gardens, perfect for a relaxing underwater vacation.",
    price: 260,
    avgRating: 4.6,
    previewImage: "/Images/House14/bedroom 7.png",
  },
  {
    ownerId: 1,
    address: "202 Seaweed Cir",
    city: "Seychelles",
    state: "Emerald Depths",
    country: "Indian Ocean",
    lat: -4.6796,
    lng: 55.492,
    name: "Seaweed Sanctuary",
    description:
      "A cozy hideaway immersed in lush seaweed forests, offering tranquility and privacy.",
    price: 275,
    avgRating: 4.7,
    previewImage: "/Images/House15/livingroom 15.png",
  },
  {
    ownerId: 2,
    address: "303 Shipwreck Blvd",
    city: "Caribbean",
    state: "Pirate's Bay",
    country: "Caribbean Sea",
    lat: 18.0425,
    lng: -63.0548,
    name: "Pirate's Cove",
    description:
      "Explore the remains of an ancient shipwreck while staying in this adventurous underwater home.",
    price: 390,
    avgRating: 4.9,
    previewImage: "/Images/House16/dinning room 7.png",
  },
  {
    ownerId: 3,
    address: "404 Blue Lagoon",
    city: "Tahiti",
    state: "Tropical Waters",
    country: "South Pacific Ocean",
    lat: -17.6509,
    lng: -149.426,
    name: "Lagoon Loft",
    description:
      "A peaceful sanctuary on the ocean floor, perfect for those seeking solitude in the quiet depths, with manta rays and sharks passing by in the distance.",
    price: 430,
    avgRating: 5.0,
    previewImage: "/Images/House17/office 3.png",
  },
  {
    ownerId: 4,
    address: "505 Mermaid Ln.",
    city: "New Caledonia",
    state: "Emerald Shores",
    country: "Coral Sea",
    lat: -21.231,
    lng: 165.7602,
    name: "Mermaid's Grotto",
    description:
      "A mystical home where you can swim with mermaids in the calm, crystal waters of the Coral Sea.",
    price: 370,
    avgRating: 4.8,
    previewImage: "/Images/House18/livingroom 4.png",
  },
  {
    ownerId: 5,
    address: "606 Leviathan Ave",
    city: "Mediterranean",
    state: "Sunken Kingdom",
    country: "Mediterranean Sea",
    lat: 34.6391,
    lng: 18.0456,
    name: "Leviathan's Lair",
    description:
      "A majestic home hidden in the Sunken Kingdom, where legends of sea monsters come to life.",
    price: 450,
    avgRating: 4.9,
    previewImage: "/Images/House19/livingroom 14.png",
  },
  {
    ownerId: 6,
    address: "707 Coral Spire",
    city: "Polynesian Isles",
    state: "Oceanic Pinnacles",
    country: "South Pacific Ocean",
    lat: -21.4527,
    lng: -159.9668,
    name: "Coral Pinnacle Villa",
    description:
      "A luxurious villa perched on top of an underwater coral spire, offering breathtaking views.",
    price: 480,
    avgRating: 4.9,
    previewImage: "/Images/House20/dinning room 10.png",
  }
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] },
    }, {});
  },
};