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



        const reviewImage = await ReviewImages.findByPk(imageId, {
            include: {
                model: Review,
                attributes: ['userId']
            }
        });

        if(reviewImage && (reviewImage.Review.userId !== userId)) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        }
        if(!reviewImage) {
            const err = new Error("Review Image couldn't be found");
            err.title = "Review Image couldn't be found";
            err.errors = "Review Image couldn't be found";
            err.status = 404;
            return next(err);
        } else {
            await reviewImage.destroy();
            res.json({ "message": "Successfully deleted" })
        }



        
        
    }
);


module.exports = router;