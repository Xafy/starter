const { faker } = require('@faker-js/faker');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    for (let i =0; i <10; i++){
      await queryInterface.bulkInsert('Products', [{
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price()
      }], {});
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
