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
                group: ['SpotImages.previewImage'],
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: {
                    model: SpotImages,
                    where: {
                        preview: true,
                    },
                    as: 'previewImage',
                    attributes: ['url']
                }
            }, {
                model: ReviewImages,
                attributes: ['id', 'url']
            }],
        }); 

        return res.json({ Reviews })
    }
);

router.post(
    '/:reviewId/images',
    requireAuth,
    async (req, res, next) => {
        const reviewId = req.params.reviewId;

        const { url } = req.body;

        const review = await Review.findByPk(reviewId);

        if(review && req.user.id !== review.userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else if(!review) {
            const err = new Error("Review couldn't be found");
            err.title = "Review couldn't be found";
            err.errors = "Review couldn't be found";
            err.status = 404;
            return next(err);
        };

        const reviewImages = ReviewImages.findAll({
            where: {
                reviewId: reviewId
            }
        });

        if(reviewImages[9]) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else {
            const newReviewImage = await review.createReviewImage({
                reviewId: reviewId,
                url: url,
                // include: [
                //     { model: ReviewImages.scope('defaultScope') }
                //   ]
            });

            const resBody = await ReviewImages.findOne({
                where: {
                    reviewId: reviewId,
                    url: url
                },
                attributes: ['id', 'url']
        });

            return res.status(200).json(resBody);
        };
        

    }
);

router.put(
    '/:reviewId',
    requireAuth,
    async (req, res, next) => {
        const reviewId = req.params.reviewId;
        console.log(reviewId)
        const { review, stars } = req.body;
        // if(!reviewId) {
        //     const err = new Error("Review couldn't be found");
        //     err.title = "Review couldn't be found";
        //     err.errors = "Review couldn't be found";
        //     err.status = 404;
        //     return next(err);
        // };

        const existingReview = await Review.findByPk(reviewId);
        console.log('###', existingReview);
        if(existingReview && req.user.id !== existingReview.userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else if(!existingReview) {
            const err = new Error("Review couldn't be found");
            err.title = "Review couldn't be found";
            err.errors = "Review couldn't be found";
            err.status = 404;
            return next(err);
        };
        if (req.user.id === existingReview.userId) {

            existingReview.review = review;
            existingReview.stars = stars;
            
            await existingReview.save();
            
        };
        res.json(existingReview);
    }
);

router.delete(
    '/:reviewId',
    requireAuth,
    async (req, res, next) => {
        const reviewId = req.params.reviewId;

        const existingReview = await Review.findByPk(reviewId);
        if(existingReview && req.user.id !== existingReview.userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else if(!existingReview) {
            const err = new Error("Review couldn't be found");
            err.title = "Review couldn't be found";
            err.errors = "Review couldn't be found";
            err.status = 404;
            return next(err);
        };
        if (req.user.id === existingReview.userId) {
            await existingReview.destroy();
            
        };
        res.json({ "message": "Successfully deleted"});
    }
)

module.exports = router;