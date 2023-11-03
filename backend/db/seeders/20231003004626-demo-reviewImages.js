'use strict';

const { ReviewImages } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImages.bulkCreate([
      {
        reviewId: 1,
        url: "image url",
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      //possible issue not knowing which table to look for for "image url"
      url: { [Op.in]: ["image url"] }
    }, {});
  }
};
