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
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage'],
            }, {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }, {
                model: ReviewImages,
                attributes: ['id', 'url']
            }],
            // attributes: {
            //     include: [
            //         [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
            //         [sequelize.col('User.url'), 'User']
            //     ]
            // },
        }); 

        return res.json({ Reviews })
    }
);

module.exports = router;