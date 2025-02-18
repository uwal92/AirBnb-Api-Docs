const express = require('express');
const router = express.Router();
const { Spot, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op, fn, col } = require('sequelize');


router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const imageId = req.params.imageId;
    const userId = req.user.id;
        // Fine the review image by imageId
        const reviewImage = await ReviewImage.findByPk(imageId, {
            include: {
                model: Review,

            },
        });
        // If the review image doesnt exist, return 404 error
        if (!reviewImage) {
            return res.status(404).json({
                message: "Review Image couldn't be found"
            });
        }
        console.log('===', reviewImage.Review.userId)
        console.log('===', userId)
        if (reviewImage.Review.userId !== userId) {
            return res.status(403).json({
                message: "Forbidden: Review Image does not belong to current user",
              });
        }

        await reviewImage.destroy();

        return res.status(200).json({
            message: "Successfully deleted"
        });

});

module.exports = router;
