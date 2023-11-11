'use strict';

const { SpotImages } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImages.bulkCreate([
      {
        spotId: 1,
        url: "https://images.app.goo.gl/vunhhXNPcB5xLKnR7",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://images.app.goo.gl/TLqBineSjwHvewaDA",
        preview: true,
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['image url'] }
    }, {})
  }
};
