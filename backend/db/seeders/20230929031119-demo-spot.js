'use strict';

const { Spot } = require('../models');


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: 'San Francisco',
        state: "California",
        country: 'United States of America',
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
      },
      {
        ownerId: 2,
        address: "123 Farm Lane",
        city: 'San Francisco',
        state: "California",
        country: 'United States of America',
        lat: 37.7645358,
        lng: 35.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 78,
      },
      {
        ownerId: 1,
        address: "123 Farm Lane",
        city: 'San Jose',
        state: "California",
        country: 'United States of America',
        lat: 37.233,
        lng: 35.23432,
        name: "Oops Academy",
        description: "Place where web developers are created",
        price: 100,
      },
      {
        ownerId: 1,
        address: "1243 Frappy Tah Way",
        city: 'San Rafael',
        state: "California",
        country: 'United States of America',
        lat: 31.312421,
        lng: 34.4322,
        name: "Mi casa",
        description: "Place where my house exists oorah",
        price: 100,
      },
      {
        ownerId: 1,
        address: "123 Zygote Phathom Lane",
        city: 'Los Angeles',
        state: "California",
        country: 'United States of America',
        lat: 32.23423,
        lng: 37.12123,
        name: "Mi casa",
        description: "Place where my house may or may not exist for Schrødinger",
        price: 100,
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['App Academy'] }
    }, {});
  }
};
