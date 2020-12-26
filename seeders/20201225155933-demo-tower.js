'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Towers', [
      {
        name: "tower1",
        location:"loc-1",
        floorCount: 10,
        officeCount: 20,
        rating: 5,
        latitude: "12.22",
        longitude: "13.23",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "tower2",
        location:"loc-2",
        floorCount: 15,
        officeCount: 20,
        rating: 4,
        latitude: "12.22",
        longitude: "13.23",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "tower3",
        location:"loc-3",
        floorCount: 8,
        officeCount: 0,
        rating: 0,
        latitude: "12.22",
        longitude: "13.23",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "tower4",
        location:"loc-4",
        floorCount: 15,
        officeCount: 0,
        rating: 1,
        latitude: "12.22",
        longitude: "13.23",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "tower5",
        location:"loc-5",
        floorCount: 118,
        officeCount: 500,
        rating: 4,
        latitude: "12.22",
        longitude: "13.23",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Towers', null, {});
  }
};
