const express = require('express');
const { Spot, Review, SpotImages, sequelize, User, ReviewImages, Sequelize } = require('../../db/models')
const { requireAuth, sendAuthorizationError } = require('../../utils/auth.js')
const { Op } = require('sequelize');
const router = express.Router();


router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;
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
    '/:spotId/reviews',
    async (req, res, next) => {
        const spotId = req.params.spotId;
        const Reviews = await Review.findAll({
            where: {
                spotId: spotId,
            },
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImages,
                attributes: ['id', 'url']
            }]
        });

        if (!Reviews[0]) {
            let err = new Error("Spot couldn't be found");
            err.title = "Spot couldn't be found";
            // err.errors = "Spot couldn't be found";
            err.status = 404;
            return next(err);
        }

        return res.json({ Reviews })
    }
);


router.get(
    '/:spotId',
    async (req, res, next) => {
        
        const spotId = req.params.spotId;
        
        const Spots = await Spot.findByPk(spotId, {
            group: ["Reviews.id", "Reviews.stars", "SpotImages.id"],
            include: [{
                model: Review,
                attributes: [],
            }, 
            {
                model: SpotImages,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
                as: "Owner"
            }],
        attributes: 
        [
            'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat',
            'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt',
            [sequelize.fn('COUNT', sequelize.col('Reviews.id')), 'numReviews'],
            [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
        ],
    });
    
    if (!Spots) {
        let err = new Error("Spot couldn't be found");
        err.title = "Spot couldn't be found";
        // err.errors = "Spot couldn't be found";
        err.status = 404;
        return next(err);
    }
    
    return res.json(Spots);
    
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

router.post(
    '/:spotId/images',
    requireAuth,
    async (req, res, next) => {
        // console.log(sendAuthorizationError());
        const spotId = req.params.spotId;
        const { url, preview } = req.body;

        const spot = await Spot.findByPk(spotId);
        if(spot && req.user.id !== spot.ownerId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.status = 403;
            return next(err);
        } else if(!spot) {
            const err = new Error("Spot couldn't be found");
            err.title = "Spot couldn't be found";
            err.status = 404;
            return next(err);
        };
        if (req.user.id === spot.ownerId) {
            await spot.createSpotImage({
                spotId: spotId,
                url: url,
                preview: preview
        });
        const newImage = await SpotImages.findOne({
            where: {
                spotId: spotId
            }
        })
        
        return res.status(200).json(newImage);
        }
    }
);

router.post(
    '/:spotId/reviews',
    requireAuth,
    async (req, res, next) => {
        // console.log(sendAuthorizationError());
        const spotId = req.params.spotId;
        const { review, stars } = req.body;

        const spot = await Spot.findByPk(spotId);

        if(!spot) {
            const err = new Error("Spot couldn't be found");
            err.title = "Spot couldn't be found";
            err.status = 404;
            return next(err);
        };

        const reviewExist = await Review.findOne({
            where: {
                spotId: spotId,
                userId: req.user.id,
            }
        });

        if(reviewExist) {
            const err = new Error("User already has a review for this spot")
            err.message = "User already has a review for this spot";
            return next(err);
        } else {
            await spot.createReview({
                userId: req.user.id,
                review: review,
                stars: stars,
            });
        }
        
        const newReview = await Review.findOne({
            where: {
                spotId: spotId,
                userId: req.user.id,
                review: review,
                stars: stars,
            }
        });
        
        return res.status(200).json(newReview);
    }
);
        
router.post(
    '/',
    requireAuth,
    async (req, res, next) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const ownerId = req.user.id;


        const user = await User.findByPk(ownerId);

        const spot = await Spot.findOne({
            where: {
                address: address
            }
        });

        if (spot) {
            let err = new Error({ "message": "Bad Request. Spot already exists"});
            err.title = "Bad Request. Spot already exists";
            err.errors = "Bad Request. Spot already exists";
            err.status = 400
            console.log(err)
            return next(err);
        };

        if (!spot) {
            const newSpot = await user.createSpot({
                ownerId: ownerId,
                address: address,
                city: city,
                state: state,
                country: country,
                lat: lat,
                lng: lng,
                name: name,
                description: description,
                price: price,
            });
            return res.status(201).json(newSpot);
        }
    }
);

router.put(
    '/:spotId',
    requireAuth,
    async (req, res, next) => {
        const spotId = req.params.spotId;

        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        const spot = await Spot.findByPk(spotId);

        if(spot && req.user.id !== spot.ownerId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else if(!spot) {
            const err = new Error("Spot couldn't be found");
            err.title = "Spot couldn't be found";
            err.errors = "Spot couldn't be found";
            err.status = 404;
            return next(err);
        };
        if (req.user.id === spot.ownerId) {
            spot.address = address;
            spot.city = city;
            spot.state = state;
            spot.country = country;
            spot.lat = lat;
            spot.lng = lng;
            spot.name = name;
            spot.description = description;
            spot.price = price;

            await spot.save();
            res.json(spot)
        };
    }
);

router.delete(
    '/:spotId',
    requireAuth,
    async (req, res, next) => {
        const spotId = req.params.spotId;

        const spot = await Spot.findByPk(spotId);

        console.log(spot)
        
        if(spot && req.user.id !== spot.ownerId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else if(!spot) {
            const err = new Error("Spot couldn't be found");
            err.title = "Spot couldn't be found";
            err.errors = "Spot couldn't be found";
            err.status = 404;
            return next(err);
        } else {
            await spot.destroy();

            return res.json({ "message": "successfully deleted" })
        }
    }
);



module.exports = router;