const express = require('express');
const router = express.Router();
const { Spot, User, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const bookingsRouter = require('./bookings');
const reviewsRouter = require('./reviews');
const { Op, fn, col, Sequelize, where } = require('sequelize');
const { check, query, body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { userAttributes, imageAttributes, spotAttributes } = require('../../utils/attributes')

const validateSpot = [
    body("address")
      .exists({ checkFalsy: true })
      .withMessage("Street address is required"),
    body("city").exists({ checkFalsy: true }).withMessage("City is required"),
    body("state").exists({ checkFalsy: true }).withMessage("State is required"), // 400
    body("country")
      .exists({ checkFalsy: true })
      .withMessage("Country is required"), // 400
    // body("lat")
    //   .exists({ checkFalsy: true })
    //   .isFloat({ min: -90, max: 90 })
    //   .withMessage("Latitude must be within -90 and 90")
    //   .toFloat(),
    // body("lng")
    //   .exists({ checkFalsy: true })
    //   .isFloat({ min: -180, max: 180 })
    //   .withMessage("Longitude must be within -180 and 180")
    //   .toFloat(),
    body("name")
      .exists({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage("Name must be less than 50 characters"),
    body("description")
      .exists({ checkFalsy: true })
      .withMessage("Description is required"),
    body("price")
      .exists({ checkFalsy: true })
      .isFloat({ gt: 0 })
      .withMessage("Price per day must be a positive number")
      .toInt(10),
    handleValidationErrors,
  ];
  
  const validateQueryParams = [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be greater than or equal to 1")
      .toInt(10),
    query("size")
      .optional()
      .isInt({ min: 1, max: 20 })
      .withMessage("Size must be between 1 and 20")
      .toInt(10),
    query("minLat")
      .optional()
      .isFloat({ min: -90, max: 90 })
      .withMessage("Minimum latitude is invalid")
      .toFloat(),
    query("maxLat")
      .optional()
      .isFloat({ min: -90, max: 90 })
      .withMessage("Maximum latitude is invalid")
      .toFloat(),
    query("minLng")
      .optional()
      .isFloat({ min: -180, max: 180 })
      .withMessage("Minimum longitude is invalid")
      .toFloat(),
    query("maxLng")
      .optional()
      .isFloat({ min: -180, max: 180 })
      .withMessage("Maximum longitude is invalid")
      .toFloat(),
    query("minPrice")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Minimum price must be greater than or equal to 0")
      .toFloat(),
    query("maxPrice")
      .optional()
      .isFloat({ min: 0 })
      .withMessage("Maximum price must be greater than or equal to 0")
      // check if max less than minPrice
      .custom((value, { req }) => {
        const minPrice = parseFloat(req.query.minPrice);
        const maxPrice = parseFloat(value);
        if (!isNaN(minPrice) && maxPrice < minPrice) {
          throw new Error(
            "Maximum price must be greater than or equal to minimum price"
          );
        }
        return true;
      })
      .toFloat(),
    handleValidationErrors,
  ];
  
  const validateBooking = [
    // Validation for request body
    check("startDate")
      .isISO8601()
      .withMessage("Invalid start date format")
      .custom((startDate) => {
        if (new Date(startDate) < new Date()) {
          throw new Error("startDate cannot be in the past");
        } else if (new Date(startDate) >= new Date(req.body.endDate)) {
          throw new Error("startDate cannot be on or after endDate");
        }
        return true;
      }),
    check("endDate")
      .isISO8601()
      .withMessage("Invalid end date format")
      .custom((endDate, { req }) => {
        if (new Date(endDate) <= new Date(req.body.startDate)) {
          throw new Error("endDate cannot be on or before startDate");
        }
        return true;
      }),
  ];
  const validateSpotImage = [
    body("url").exists({ checkFalsy: true }).withMessage("Url is required"),
    body("preview")
      .exists({ checkFalsy: true })
      .isBoolean()
      .withMessage("Preview is required"),
  ];

  const formatDate = (date) => {
    const isoString = date.toISOString();
    return isoString.substring(0, 19).replace('T', ' ');
  };
  
  // router.use("/:spotId/bookings", bookingsRouter);
  // router.use("/:spotId/reviews", reviewsRouter);

// Get all spots owned by the current user
router.get('/current', requireAuth, async (req, res, next) => {
  const userId = req.user.id;
  try {
      const allSpots = await Spot.findAll({
          where: {
              ownerId: userId
          },
      });
      const response = await Promise.all(
        allSpots.map(async (spot) => {
          const reviews = await Review.findAll({
            where: {
              spotId: spot.id,
            },
            attributes: ['stars']
          });
          const avgRating = 
            reviews.length > 0 
            ? (
              reviews.reduce((sum, review) => sum + review.stars, 0) / reviews.length
          ).toFixed(1)
          : null;

          const spotImage = await SpotImage.findOne({
            where: {
              spotId: spot.id,
              preview: true,
            }, 
            attributes: ['url'],
          });
          return {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: parseFloat(spot.lat),
            lng: parseFloat(spot.lng),
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: formatDate(spot.createdAt),
            updatedAt: formatDate(spot.updatedAt),
            avgRating,
            previewImage: spotImage ? spotImage.url : null,
          };
        })
      );
      return res.status(200).json({ Spots: response });
  } catch (error) {
      next(error);
  }
});

// Get all reviews by a Spot's id
// Get all Reviews by a Spot's Id
router.get('/:spotId/reviews', async (req, res, next) => {

  try {
      const spotId = req.params.spotId;
      if (spotId === 'null') {
          return res.status(404).json({
              message: 'Not found',
          });
      }

      const spot = await Spot.findByPk(spotId);

      if (!spot) {
          return res.status(404).json({
              message: "Spot couldn't be found",
          });
      }

      const allSpotReviews = await Review.findAll({
          where: { spotId },
          include: [
              {
                  model: User,
                  attributes: ['id', 'firstName', 'lastName'],
              },
              {
                  model: ReviewImage,
                  attributes: ['id', 'url'],
              },
          ],
      });

      const response = allSpotReviews.map((review) => ({
          id: review.id,
          userId: review.userId,
          spotId: review.spotId,
          review: review.review,
          stars: review.stars,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
          User: review.User,
          ReviewImages: review.ReviewImages,
      }));

      res.status(200).json({ Reviews: response });
  } catch (err) {
      next(err);
  }
});
// router.get('/:spotId/reviews', async (req, res) => {
//   const spotId = req.params.spotId;
//   const findSpot = await Spot.findByPk(spotId);
//   if (!findSpot) {
//       return res.status(404).json({
//           message: "Spot couldn't be found"
//       })
//   };
//   const reviews = await Review.findAll({
//       where: {
//           spotId: spotId
//       },
//       include: [
//           {
//               model: User,
//               attributes: ['id', 'firstName', 'lastName']
//           },
//           {
//               model: ReviewImage,
//               attributes: ['id', 'url']
//           }
//       ]
//   });
//   const response = reviews.map((review) => ({
//     id: review.id,
//     userId: review.userId,
//     spotId: review.spotId,
//     review: review.review,
//     stars: review.stars,
//     createdAt: review.createdAt,
//     updatedAt: review.updatedAt,
//     User: review.User,
//     ReviewImages: review.ReviewImages,
// }));
//   res.status(200).json({ Reviews: response });
// });

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', async (req, res) => {
    const { spotId } = req.params;
    const user = req.user;
    const findSpotId = await Spot.findByPk(spotId);
    if (!findSpotId) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        })
    };
    if(findSpotId.ownerId !== user.id) {
        const findBooking = await Booking.findAll({
            where
        })
    };
})



// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findOne({
        where: { id: spotId }, 
        include: [
            {
                model: User,
                as: "Owner",
                attributes: ["id", "firstName", "lastName"],
            },
            {
                model: SpotImage,
                as: 'SpotImages',
                attributes: ["id", "url", "preview"],
            },
            {
                model: Review,
                as: 'Reviews',
                attributes: ["stars"],
            },
        ],
    });
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    }
    const spotDetails = spot.toJSON();

    let totalStars = 0;
    let reviewCount = 0;
  
    spotDetails.Reviews.forEach((review) => {
      totalStars += review.stars;
      reviewCount++;
    });
  
    spotDetails.avgStarRating =
      reviewCount > 0 ? parseFloat((totalStars / reviewCount).toFixed(1)) : null;
    spotDetails.numReviews = reviewCount;
  
    spotDetails.ownerId = spotDetails.Owner.id;
  
    const formattedSpotImages = spotDetails.SpotImages.map((image) => ({
        id: image.id,
        url: image.url,
        preview: image.preview,
    }));
  
    const formattedResponse = {
      id: spotDetails.id,
      ownerId: spotDetails.ownerId,
      address: spotDetails.address,
      city: spotDetails.city,
      state: spotDetails.state,
      country: spotDetails.country,
      lat: spotDetails.lat,
      lng: spotDetails.lng,
      name: spotDetails.name,
      description: spotDetails.description,
      price: spotDetails.price,
      createdAt: spotDetails.createdAt,
      updatedAt: spotDetails.updatedAt,
      numReviews: spotDetails.numReviews,
      avgStarRating: spotDetails.avgStarRating,
      SpotImages: formattedSpotImages,
      Owner: {
        id: spotDetails.Owner.id,
        firstName: spotDetails.Owner.firstName,
        lastName: spotDetails.Owner.lastName,
      },
    };
    res.status(200).json(formattedResponse);
  });



// Get all spots 
router.get('/', validateQueryParams, async (req, res, next) => {
    let { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    const page = req.query.page ?? 1;
    const size = req.query.size ?? 20;
    const limit = size ?? 20;
    const offset = page ? (page - 1) * size : 0;
    const where= {};
    if (minLat !== undefined && maxLat !== undefined) {
        where.lat = {
            [Op.between]: [minLat, maxLat],
        };
    } else if (minLat !== undefined) {
        where.lat = {
            [Op.gte]: minLat
        };
    } else if (maxLat !== undefined) {
        where.lat = {
            [Op.lte]: maxLat,
        };
    }
    if (minLng !== undefined && maxLng !== undefined) {
        where.lng = {
            [Op.between]: [minLng, maxLng],
        };
    } else if (minLng !== undefined) {
        where.lng = {
            [Op.gte]: minLng,
        };
    } else if (maxLng !== undefined) {
        where.lng = {
            [Op.lte]: maxLng
        };
    }
    if (minPrice !== undefined && maxPrice !== undefined) {
        where.price = {
          [Op.between]: [minPrice, maxPrice],
        };
      } else if (minPrice !== undefined) {
        where.price = {
          [Op.gte]: minPrice,
        };
      } else if (maxPrice !== undefined) {
        where.price = {
          [Op.lte]: maxPrice,
        };
      }
      try {
        const spots = await Spot.findAll({
          where,
          limit,
          offset,
          include: [
            {
              model: Review,
              as: 'Reviews',
              attributes: ["stars"],
            },
            {
              model: SpotImage,
              as: 'SpotImages',
              attributes: ["url", "preview"],
              required: false,
            },
          ],
        });
    
        let spotsList = spots.map((spot) => spot.toJSON());
    
        // Process each spot to include avgRating and previewImage
        spotsList.forEach((spot) => {
          // Calculate average rating
          let totalStars = 0;
          let reviewCount = 0;
          spot.Reviews.forEach((review) => {
            totalStars += review.stars;
            reviewCount++;
          });
    
          if (reviewCount > 0) {
            spot.avgRating = parseFloat((totalStars / reviewCount).toFixed(1));
          } else {
            spot.avgRating = null;
          }
          delete spot.Reviews; // Remove Reviews after processing avgRating
    
          // Calculate preview image
          spot.SpotImages.forEach((image) => {
            if (image.preview === true) {
              spot.previewImage = image.url;
            }
          });
          if (!spot.previewImage) {
            spot.previewImage = "No preview image available";
          }
          delete spot.SpotImages; // Remove SpotImages after processing previewImage
          console.log(typeof spot.lat);
          return spot;
        });
    
        res.json({ Spots: spotsList, page, size });
      } catch (error) {
        next(error);
      }
    });

// Create a review for a Spot based on the Spot's id
router.post('/:spotId/reviews',requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const { review, stars } = req.body;
  
    const findSpot = await Spot.findByPk(spotId);
    if (!findSpot) {
      return res.status(404).json({
        message: "Spot couldn't be found"
      });
    }
  
    const existingReview = await Review.findOne({
      where: {
        userId,
        spotId,
      }
    });
    if (existingReview) {
      return res.status(500).json({
        message: "User already has a review for this spot"
      });
    }
  
//     if (typeof review !== 'string' || review.trim() === '') {
//   return res.status(400).json({
//     message: "Review text is required"
//   });
// }
  
//     if (typeof stars !== 'number' || stars < 1 || stars > 5) {
//       return res.status(400).json({
//         message: "Stars must be an integer from 1 to 5"
//       });
//     }

    if (!review || stars == null) {
      return res.status(400).json({
          message: 'Validation error',
          errors: {
              review: 'Review text is required',
              stars: 'Stars must be an integer from 1 to 5',
          },
      });
    }
    if (stars < 1 || stars > 5 || !Number.isInteger(stars)) {
      return res.status(400).json({
          message: 'Validation error',
          errors: {
              stars: 'Stars must be an integer from 1 to 5',
          },
      });
    }
  
    const newReview = await Review.create({
      spotId,
      userId,
      review,
      stars
    });
  
    return res.status(201).json({
      id: newReview.id,
      userId: newReview.userId,
      spotId: newReview.spotId,
      review: newReview.review,
      stars: newReview.stars,
      createdAt: newReview.createdAt,
      updatedAt: newReview.updatedAt
    });
  });


// Add an image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const { url, preview } = req.body;
    const spotId = req.params.spotId;
    const userId = req.user.id;

    try {
        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found"
            });
        }
        if (spot.ownerId !== userId) {
            return res.status(403).json({
                message: "Forbidden: You do not have permission to add images to this spot",
            });
        }
        const newImg = await SpotImage.create({
            spotId: spot.id,
            url,
            preview,
        });
        formattedImage = {
            id: newImg.id,
            url,
            preview,
        };
        res.status(201).json(formattedImage);
    } catch (error) {
        next(error);
    }
});

// Create a spot 
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = req.user.id;

    try {
        const newSpot = await Spot.create({
            ownerId: ownerId,
            address,
            city, 
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });
        res.status(201).json(newSpot)
    } catch (error) {
        next(error);
    }
});



// Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res, next) => {
    const spotId = req.params.spotId;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const ownerId = req.user.id;

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId !== ownerId) {
      return res.status(403).json({
        message: "Forbidden: Spot does not belong to user",
      });
    }

    await spot.update({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });
    await spot.save();

    res.json({
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
    });
  } catch (error) {
    next(error);
  }
});

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId;
    const ownerId = req.user.id;

    try {
        const spot = await Spot.findByPk(spotId);
        if(!spot) {
            return res.status(404).json({
                message: "Spot couldn't be found"
            });
        }
        if(spot.ownerId !== ownerId) {
            return res.status(403).json({
                message: "Forbidden: Spot does not belong to user"
            });
        }
        await spot.destroy();
        return res.status(200).json({
            message: 'Successfully deleted'
        });
    } catch (error) {
        next(error);
    }
});








module.exports = router;