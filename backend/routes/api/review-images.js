const express = require('express');
const { Spot, Review, SpotImages, ReviewImages, sequelize, User, Sequelize } = require('../../db/models')
const { requireAuth, sendAuthorizationError } = require('../../utils/auth.js')
const { Op } = require('sequelize');
const router = express.Router();


router.delete(
    '/:imageId',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const imageId = req.params.imageId

        const reviewImage = await ReviewImages.findbyPk({
            where: {
                userId: userId
            },
            include: {
                model: Review,
            }
        });

    }
);


module.exports = router;