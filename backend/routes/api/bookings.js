const express = require('express');
const { Spot, Review, SpotImages, sequelize, User, Booking, Sequelize } = require('../../db/models')
const { requireAuth, sendAuthorizationError } = require('../../utils/auth.js')
const { Op } = require('sequelize');
const router = express.Router();

router.get(
    '/current',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id;

        const Bookings = await Booking.findAll({
            where: {
                userId: userId
            },
            include: {
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
            }
        });

        res.json({ Bookings })
    }
);

router.put(
    '/:bookingId',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const { startDate, endDate } = req.body;

        const booking = Booking.findByPk(userId);

        if (booking.userId !== userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else if(!booking) {
            const err = new Error("Booking couldn't be found");
            err.title = "Booking couldn't be found";
            err.errors = "Booking couldn't be found";
            err.status = 404;
            return next(err);
        } else if (startDate >= endDate) {
            const err = new Error("Bad Request");
            err.message = "Bad Request";
            err.errors = "endDate cannot be on or before startDate";
            err.status = 400;
            return next(err);
        } else {
            booking.startDate = startDate;
            booking.endDate = endDate;
            await booking.save();

            res.json(booking)
        }
    }
);

router.delete(
    '/:bookingId',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const { startDate, endDate } = req.body;

        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();

        if(!day[1]) day.split('').unshift('0').join('')
        newdate = year + "-" + month + "-" + day;
        console.log(newDate)
        const booking = Booking.findByPk(userId);

        if (booking.userId !== userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        } else if(!booking) {
            const err = new Error("Booking couldn't be found");
            err.title = "Booking couldn't be found";
            err.errors = "Booking couldn't be found";
            err.status = 404;
            return next(err);
        } else if (startDate >= endDate) {
            const err = new Error("Bad Request");
            err.message = "Bad Request";
            err.errors = "endDate cannot be on or before startDate";
            err.status = 400;
            return next(err);
        } else {

            await booking.destroy();

            res.json({"message": "Successfully deleted"});
        }
    }
);

module.exports = router;