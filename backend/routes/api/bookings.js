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
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        const bookingId = req.params.bookingId

        const currentDate = new Date();

        const editBooking = await Booking.findByPk(bookingId);

        const bookings = await Booking.findAll({
            where: {
                spotId: editBooking.spotId
            }
        });

        console.log("###", userId, editBooking)

        if(!editBooking) {
            const err = new Error("Booking couldn't be found");
            err.title = "Booking couldn't be found";
            err.errors = "Booking couldn't be found";
            err.status = 404;
            return next(err);
        }
        if (editBooking.userId !== userId) {
            const err = new Error("Forbidden");
            err.title = "Forbidden";
            err.errors = "Forbidden";
            err.status = 403;
            return next(err);
        }
        if (editBooking.endDate < currentDate || endDate < currentDate) {
            const err = new Error("Past bookings can't be modified");
            err.title = "Past bookings can't be modified";
            err.errors = "Past bookings can't be modified";
            err.status = 403;
            return next(err);
        }
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
            ) {
                const err = new Error("Sorry, this spot is already booked for the specified dates");
                err.message = "Sorry, this spot is already booked for the specified dates";
                err.errors = {"startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"};
                err.status = 403;
                return next(err);
            }
        }
        if (startDate >= endDate) {
            const err = new Error("Bad Request");
            err.message = "Bad Request";
            err.errors = "endDate cannot be on or before startDate";
            err.status = 400;
            return next(err);
        } else {
            editBooking.startDate = startDate;
            editBooking.endDate = endDate;
            await editBooking.save();

            res.json(editBooking);
        }
    }
);

router.delete(
    '/:bookingId',
    requireAuth,
    async (req, res, next) => {
        const userId = req.user.id;
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        let currentDate = new Date();

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