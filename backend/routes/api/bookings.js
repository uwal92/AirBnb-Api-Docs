const express = require('express');
const booking = require('../../db/models/booking');
const router = express.Router();
const { Spot, User, Booking, SpotImage, Review, ReviewImage } = require('../../db/models');
const { literal } = require('sequelize');

// Get all of the Current User's bookings
router.get('/current', async (req, res) => {
    const user = req.user;
    const allBookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            }, 
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt'],
                    include: [
                        [
                            literal(`(
                                SELECT url
                                FROM SpotImages AS SpotImage
                                WHERE
                                    SpotImage.preview = true
                                    AND
                                    SpotImage.spotId = Spot.id
                            )`),
                            'previewImage',
                        ],
                    ]
                },
            },
        ]
    });
    return res.status(200).json({Bookings: allBookings});
});






module.exports = router;



