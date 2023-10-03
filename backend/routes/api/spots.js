const express = require('express');
const { Spot, Review, SpotImages, sequelize } = require('../../db/models')
const { requireAuth } = require('../../utils/auth.js')
const { Op } = require('sequelize');

const router = express.Router();

router.get(
    '/:spotId',
    async (req, res) => {

        const spotId = req.params.spotId ? req.params.spotId : spot;
        const Spots = await Spot.findAll({
            where: {
                id: spotId,
            },
            include: [{
                model: Review,
                attributes: [],
            }, {
                model: SpotImages,
                attributes: {[sequelize.fn('COUNT', sequelize.col('id')), 'numReviews']},
                
            }],
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
                    [sequelize.col('SpotImages.url'), 'previewImage']
                ]
            },
        });

        if (!Spots) {
            return res.status(404).json({"message": "Spot couldn't be found"})
        }


        return res.json(Spots)

    }
);

router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id
        const Spots = await Spot.findAll({
            where: {
                ownerId: userId,
            },
            include: [{
                model: Review,
                attributes: [],
            }, {
                model: SpotImages,
                where: 'preview' === true,
                attributes: []
            }],
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
                    [sequelize.col('SpotImages.url'), 'previewImage']
                ]
            },
        });

        return res.json({ Spots })

    }
);

router.get(
    '/',
    async (req, res) => {
        const Spots = await Spot.findAll({

            // this route for pagination
            include: [{
                model: Review,
                // as: 'reviews'
                attributes: [],
            }, {
                model: SpotImages,
                where: 'preview' === true,
                attributes: []
            }],
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
                    [sequelize.col('SpotImages.url'), 'previewImage']
                ]
            },
        });

        return res.json({ Spots })
    }
);

module.exports = router;