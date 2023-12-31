'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        userId: 3,
        spotId: 1,
        review: "This was an ugly spot!",
        stars: 1,
      },
      {
        userId: 4,
        spotId: 2,
        review: "This was an interesting spot!",
        stars: 4,
      },
      {
        userId: 5,
        spotId: 3,
        review: "This was a fire spot! House literally burned down... 1 star",
        stars: 1,
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ["This was an awesome spot!"] }
    }, {});
  }
};
