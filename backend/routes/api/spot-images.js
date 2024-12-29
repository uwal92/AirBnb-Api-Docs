const express = require('express');
const { Spot, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// DELETE a spot image
router.delete('/:imageId', requireAuth, async (req, res) => {
    if (req.params.imageId === 'null') {
    }
    const imageId = req.params.imageId;
    const userId = req.user.id;
    const spotImage = await SpotImage.findByPk(imageId);
    if (!spotImage) {
        return res.status(404).json({
            message: "Spot Image couldn't be found",
        });
    }
    const spot = await Spot.findByPk(spotImage.spotId);
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
        });
    }
    if (spot.ownerId !== userId) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    await spotImage.destroy();
    return res.status(200).json({
        message: 'Successfully deleted',
    });
});
// router.delete('/:imageId', requireAuth, async (req, res) => {
//     const imageId = req.params.imageId;
//     const userId = req.user.id;
//     try {

//         const spotImage = await SpotImage.findByPk(imageId);

//         if (!spotImage) {
//             return res.status(404).json({
//                 message: "Spot Image couldn't be found"
//             });
//         }

//         const spot = await Spot.findByPk(spotImage.spotId);

//         if (!spot) {
//             return res.status(404).json({
//                 message: "Spot couldn't be found"
//             });
//         }

//         if (spot.ownerId !== userId) {
//             return res.status(403).json({
//                 message: "Forbidden"
//             })
//         }

//         await spotImage.destroy();

//         return res.status(200).json({
//             message: "Successfully deleted"
//         });
//     } catch (error) {
//         console.error('Error deleting spot image:', error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
    
// });

module.exports = router;
