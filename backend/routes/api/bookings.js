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




module.exports = router;