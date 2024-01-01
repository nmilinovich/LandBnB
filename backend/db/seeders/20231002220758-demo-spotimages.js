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
        url: "https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fHw%3D",
        preview: true,
      },
      {
        spotId: 1,
        url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D",
        preview: false,
      },      {
        spotId: 1,
        url: "https://cdn.apartmenttherapy.info/image/upload/v1556716350/stock/8ea241e96504a398f291a31939963e8ba948368c.jpg",
        preview: false,
      },      {
        spotId: 1,
        url: "https://images.coolhouseplans.com/plans/80523/80523-b440.jpg",
        preview: false,
      },      {
        spotId: 1,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHApBYfk6eJoTBU9FnEvUNLjXhSiX1C14h5Q&usqp=CAU",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://www.bhg.com/thmb/rHNvrcup_R5Mm2xiCTL34zkjefc=/4653x0/filters:no_upscale():strip_icc()/101318214_preview-6e44a19fb4af42559cdf1b749a7e9148.jpg",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://img.freepik.com/free-photo/blue-house-with-blue-roof-sky-background_1340-25953.jpg",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://www.thehousedesigners.com/images/uploads/SiteImage-Landing-contemporary-house-plans-1.webp",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-7.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://hips.hearstapps.com/hmg-prod/images/tiny-houses-1579284305.png?crop=1.00xw:0.397xh;0,0.332xh&resize=640:*",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBleHRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://cdn.houseplansservices.com/product/dt0biqq4ga38s7rdm8tjnbglkp/w560x373.jpg?v=2",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://cdn.luxe.digital/media/20230123162705/most-expensive-houses-in-the-world-reviews-luxe-digital.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://images.familyhomeplans.com/cdn-cgi/image/fit=scale-down,quality=85/plans/44207/44207-b580.jpg",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://hips.hearstapps.com/hmg-prod/images/tiny-houses-1579284305.png?crop=1.00xw:0.397xh;0,0.332xh&resize=640:*",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://cdn.houseplansservices.com/product/o3rhmk1de3f7bc8gmi66ov68ut/w620x413.jpg?v=2",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://www.bankrate.com/2022/08/04093343/Buying-a-house-with-an-LLC.jpg?auto=webp&optimize=high&crop=16:9",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://cdn.houseplansservices.com/product/g8don8g8g04bdnb7mfss65rj62/w560x373.jpg?v=2",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://parade.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTgwODMzNDk3ODUxMDA1/home-alone-house.jpg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://wallpapers.com/images/hd/beautiful-house-pictures-gi9u23e95gi8iu2e.jpg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bHV4dXJ5JTIwaG91c2V8ZW58MHx8MHx8fDA%3D",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://img.onmanorama.com/content/dam/mm/en/lifestyle/decor/images/2023/6/1/house-middleclass.jpg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://assets-news.housing.com/news/wp-content/uploads/2022/04/07013406/ELEVATED-HOUSE-DESIGN-FEATURE-compressed.jpg",
        preview: false,
      },
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
