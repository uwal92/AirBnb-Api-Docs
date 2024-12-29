const express = require("express");
const router = express.Router();
const { Spot, Review, User, ReviewImage } = require("../../db/models/index.js");
const review = require("../../db/models/review.js");
const { literal } = require("sequelize");
const { requireAuth } = require("../../utils/auth.js");

const authorization = async (req, res, next) => {
  if (!req.user) {
    return res.status(403).json({
      message: "Authorization required",
    });
  }
  next();
};

// Get all reviews of the current user (get all reviews made by current user)
router.get("/current", requireAuth, async (req, res) => {
  if (req.user) {
    const schema =
      process.env.NODE_ENV === "production" ? `"${process.env.SCHEMA}".` : "";
    const currentReviews = await Review.findAll({
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: Spot,
          attributes: {
            exclude: ["description", "createdAt", "updatedAt"],
            include: [
              [
                literal(`(
                                    SELECT "url"
                                    FROM ${schema}"SpotImages" AS "SpotImage"
                                    WHERE
                                        "SpotImage"."preview" = true
                                        AND
                                        "SpotImage"."spotId" = "Spot"."id"
                                )`),
                "previewImage",
              ],
            ],
          },
        },
        {
          model: ReviewImage,
          attributes: ["id", "url"],
        },
      ],
    });
    return res.status(200).json({ Reviews: currentReviews });
  }
  return res.json({ message: "No user is currently logged in" });
});

router.get("/", requireAuth, async (req, res) => {
  const allReviews = await Review.findAll({
    include: [
      {
        model: Spot,
        attributes: {
          exclude: ["description", "createdAt", "updatedAt"],
        },
      },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });
  res.json(allReviews);
});

// Add an image to a Review based on the Review's id
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const userId = req.user.id;
  const reviewId = req.params.reviewId;
  const { url } = req.body;
  const review = await Review.findByPk(reviewId);
  if (!review) {
    return res.status(404).json({
      message: "Review couldn't be found",
    });
  }
  if (review.userId !== userId) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
  const imageCount = await ReviewImage.count({
    where: {
      reviewId,
    },
  });
  if (imageCount >= 10) {
    return res.status(403).json({
      message: "Maximum number of images for this resource was reached",
    });
  }
  const newImage = await ReviewImage.create({
    reviewId,
    url,
  });
  return res.status(201).json({
    id: newImage.id,
    url: newImage.url,
  });
});

// Edit a Review
router.put("/:reviewId", requireAuth, async (req, res) => {
  const reviewId = req.params.reviewId;
  const { review, stars } = req.body;
  const userId = req.user.id;
  const existingReview = await Review.findByPk(reviewId);
  if (!existingReview) {
    return res.status(404).json({
      message: "Review couldn't be found",
    });
  }
  if (existingReview.userId !== userId) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }
  const errors = {};
  if (!review) {
    errors.review = "Review text is required";
  }
  if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
    errors.stars = "Stars must be an integer from 1 to 5";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: "Bad Request",
      errors,
    });
  }
  existingReview.review = review;
  existingReview.stars = stars;
  await existingReview.save();

  return res.status(200).json({
    id: existingReview.id,
    userId: existingReview.userId,
    spotId: existingReview.spotId,
    review: existingReview.review,
    stars: existingReview.stars,
    createdAt: existingReview.createdAt,
    updatedAt: existingReview.updatedAt,
  });
});

// Delete a review
router.delete("/:reviewId", requireAuth, async (req, res) => {
  if (!req.user) {
    return res.status(403).json({
      message: "Authorization required",
    });
  }
  const reviewId = req.params.reviewId;
  const deleteReview = await Review.findByPk(reviewId);
  if (!deleteReview) {
    return res.status(404).json({
      message: "Review couldn't be found",
    });
  }
  if (deleteReview.userId !== req.user.id) {
    return res.status(403).json({
      message: "Review must belong to the current user",
    });
  }
  await deleteReview.destroy();

  return res.status(200).json({
    message: "Successfully deleted",
  });
});

module.exports = router;
