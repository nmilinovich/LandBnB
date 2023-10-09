const express = require('express');
const { Spot, Review, ReviewImages, SpotImages, sequelize, User, Sequelize } = require('../../db/models')
const { requireAuth, sendAuthorizationError } = require('../../utils/auth.js')
const { Op } = require('sequelize');
const router = express.Router();

router.delete(
    '/:imageId',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const imageId = req.params.imageId

        const spotImage = await SpotImages.findByPk(imageId, {
            include: {
                model: Spot,
                attributes: ['ownerId']
            }
        });

        if(spotImage && spotImage.Spot.ownerId !== userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } 
        if(!spotImage) {
            const err = new Error("Spot Image couldn't be found");
            err.title = "Spot Image couldn't be found";
            err.errors = "Spot Image couldn't be found";
            err.status = 404;
            return next(err);
        } else {
            await spotImage.destroy();
            res.json({ "message": "Successfully deleted" })
        }
    }
);

module.exports = router;