const express = require('express');
const { Spot, Review, SpotImages, sequelize } = require('../../db/models')

const router = express.Router();
const { Op } = require('sequelize');

router.get(
    '/',
    async (req, res) => {
        const spots = await Spot.findAll({
            include: [{
                model: Review,
                // as: 'reviews',
                attributes: [],
            },
                {
                    model: SpotImages,
                    where: 'preview' === true,
                    attributes: []
                }
            ],
            attributes: {
                include: [
                    [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
                    [sequelize.col('SpotImages.url'), 'url']
                ]
            },
                // "previewImage": "image url"
        });

        return res.json({ spots })
    }
);

module.exports = router;