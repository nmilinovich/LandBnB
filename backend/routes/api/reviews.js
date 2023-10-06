const express = require('express');
const { Spot, Review, SpotImages, ReviewImages, sequelize, User, Sequelize } = require('../../db/models')
const { requireAuth, sendAuthorizationError } = require('../../utils/auth.js')
const { Op } = require('sequelize');
const router = express.Router();

router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;


        const Reviews = await Review.findAll({
            where: {
                userId: userId,
            },
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }, {
                model: Spot,
                group: ['SpotImages.url'],
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: {
                    model: SpotImages,
                    where: {
                        '%SpotImages.spotId%': Sequelize.col('Spot.id'),
                        preview: true,
                    },
                    attributes: [[sequelize.col('url'), 'previewImage']]
                }
            }, {
                model: ReviewImages,
                attributes: ['id', 'url']
            }],
            // attributes: {
            //     include: [
            //         [sequelize.col('SpotImages.url'), 'previewImage']
            //     ]
            // },
        }); 

        return res.json({ Reviews })
    }
);

module.exports = router;