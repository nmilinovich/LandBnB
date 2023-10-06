const express = require('express');
const { Spot, Review, SpotImages, sequelize, User, Sequelize } = require('../../db/models')
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
                attributes: [],
            }, {
                model: SpotImages,
                where: 'preview' === true,
                attributes: []
            }, {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }],
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
                    [sequelize.col('User.url'), 'User']
                ]
            },
        }); 

        return res.json({ Reviews })
    }
);

module.exports = router;