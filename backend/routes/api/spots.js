const express = require('express');
const { Spot, Review, SpotImages, Booking, sequelize, User, ReviewImages, Sequelize } = require('../../db/models')
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
    '/:spotId/bookings',
    requireAuth,
    async (req, res, next) => {
        const ownerId = req.user.id;
        const spotId = req.params.spotId;

        const spot = await Spot.findByPk(spotId);
        
        if(!spot) {
            const err = new Error("Spot couldn't be found");
            err.title = "Spot couldn't be found";
            err.status = 404;
            return next(err);
        };

        console.log(spot.dataValues.ownerId)
        if (spot.dataValues.ownerId === ownerId) {
            const Bookings = await Booking.findAll({
                where: {
                    spotId: spotId
                },
                include: [{
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }],
            });

            res.json({ Bookings })

        } else {
            const Bookings = await Booking.findAll({
                where: {
                    spotId: spotId
                },
                attributes: ['spotId', 'startDate', 'endDate']
            });

            res.json({ Bookings })
        }
    }
);

router.get(
    '/:spotId/reviews',
    async (req, res, next) => {
        const spotId = req.params.spotId;

        const spot = await Spot.findByPk(spotId);
        if (!spot) {
            let err = new Error("Spot couldn't be found");
            err.title = "Spot couldn't be found";
            // err.errors = "Spot couldn't be found";
            err.status = 404;
            return next(err);
        }
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
            [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgStarRating'],
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
    async (req, res, next) => {

        let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
        if (page) page = parseInt(page);
        if (size) size = parseInt(size);

        if (minLat) minLat = parseInt(minLat);
        if (maxLat) maxLat = parseInt(maxLat);
        if (minLng) minLng = parseInt(minLng);
        if (maxLng) maxLng = parseInt(maxLng)
        if (minPrice) minPrice = parseInt(minPrice);
        if (maxPrice) maxPrice = parseInt(maxPrice);


        if (!page || !Number.isInteger(page) || page > 10 || page < 1) {
            page = 1;
        } 

        if (!size || !Number.isInteger(size) || size > 20 || size < 1) {
            size = 20;
        } 


        let query = {
            where: {
            },
            include: [{
                model: Review,
                // as: 'reviews'
                attributes: ['stars'],
            }, {
                model: SpotImages,
                where: {
                    'preview': true,
                },
                attributes: ['url'],
                as: 'previewImage'
            }],
        };
        
        query.limit = size;
        query.offset = size * (page - 1);

        if (
            (!Number.isInteger(page) || page > 10 || page < 1) ||
            (!Number.isInteger(size) || size > 20 || size < 1) ||
            (maxLat && (maxLat > 90 || maxLat < -90)) ||
            (minLat && (minLat > 90 || minLat < -90)) ||
            (maxLng && (maxLng > 180 || maxLng < -180)) ||
            (minLng && (minLng > 180 || minLng < -180)) ||
            (minPrice && minPrice < 0) ||
            (maxPrice && maxPrice < 0) 
        ) {
            const err = new Error("Bad Request");
            err.message = "Bad Request";
            err.errors = {
                "page": "Page must be greater than or equal to 1",
                "size": "Size must be greater than or equal to 1",
                "maxLat": "Maximum latitude is invalid",
                "minLat": "Minimum latitude is invalid",
                "minLng": "Maximum longitude is invalid",
                "maxLng": "Minimum longitude is invalid",
                "minPrice": "Minimum price must be greater than or equal to 0",
                "maxPrice": "Maximum price must be greater than or equal to 0"
            };
            err.status = 400;
            return next(err);
        } 

        if (minLat && maxLat) {
            query.where.lat = {
                [Op.gte]: minLat,
                [Op.lte]: maxLat,
            };
        };
        if (minLat && !maxLat) {
            query.where.lat = {
                [Op.gte]: minLat,
            };
        };
        if (!minLat && maxLat) {
            query.where.lat = {
                [Op.lte]: maxLat,
            };
        };
        if (minLng && maxLng) {
            query.where.lng = {
                [Op.gte]: minLng,
                [Op.lte]: maxLng,
            };
        };
        if (minLng && !maxLng) {
            query.where.lng = {
                [Op.gte]: minLng,
            };
        };
        if (!minLng && maxLng) {
            query.where.lng = {
                [Op.lte]: maxLng,
            };
        };
        if (minPrice && maxPrice) {
            query.where.price = {
                [Op.gte]: minPrice,
                [Op.lte]: maxPrice
            }
        };
        if (minPrice && !maxPrice) {
            query.where.price = {
                [Op.gte]: minPrice,
            }
        };
        if (!minPrice && maxPrice) {
            query.where.price = {
                [Op.lte]: maxPrice
            }
        };

        const Spots = await Spot.findAll(query);

        let returnedSpots = Spots.map(obj => {
            let spot = obj.toJSON();
            let numStars = 0;
            spot.Reviews.forEach((review) => {
                numStars += review.stars;
            });
            spot.avgRating = numStars/spot.Reviews.length;
            delete spot.Reviews;
            console.log(spot)
            return spot;
        });

        return res.json({ 
           "Spots": returnedSpots,
           "page": page,
           "size": size
        });
    }
);

router.post(
    '/:spotId/bookings',
    requireAuth,
    async (req, res, next) => {

        const ownerId = req.user.id;
        const spotId = req.params.spotId;
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);

        const spot = await Spot.findByPk(spotId);
        const bookings = await Booking.findAll({
            where: {
                spotId: spotId
            }
        });
        console.log(bookings)
        if(!spot) {
            const err = new Error("Spot couldn't be found");
            err.title = "Spot couldn't be found";
            err.status = 404;
            return next(err);
        };
        if(spot.dataValues.ownerId === ownerId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.status = 403;
            return next(err);
        } else {
            if (startDate >= endDate) {
                const err = new Error("Bad Request");
                err.message = "Bad Request";
                err.errors = "endDate cannot be on or before startDate";
                err.status = 400;
                return next(err);
            };

        for (let booking of bookings) {
            console.log(typeof booking.startDate)
            let oldBookingStartDate = booking.startDate;
            let oldBookingEndDate = booking.endDate;
            console.log(startDate, oldBookingStartDate);
            if (
                (startDate >= oldBookingStartDate 
                && startDate <= oldBookingEndDate) 
                || (endDate <= oldBookingEndDate 
                && endDate >= oldBookingStartDate)
                || (startDate <= oldBookingStartDate
                && endDate >= oldBookingEndDate)
            ) {
                const err = new Error("Sorry, this spot is already booked for the specified dates");
                err.message = "Sorry, this spot is already booked for the specified dates";
                err.errors = {"startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"};
                err.status = 403;
                return next(err);
            }
        }
            const newBooking = await spot.createBooking({ 
                userId: ownerId,
                startDate: startDate,
                endDate: endDate,
            });

            res.json(newBooking);
            
        };
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
        
        return res.status(201).json(newReview);
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