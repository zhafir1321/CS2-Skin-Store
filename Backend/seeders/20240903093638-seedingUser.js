'use strict';
const { hash } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Users', [
      {
        fullName: 'Zhafir Rasyid Muhammad Hafidz',
        username: 'zhafir1321',
        password: hash('12345'),
        email: 'zahfir1000@gmail.com',
        role: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: 'Muhammad Hafidz',
        username: 'hafidz123',
        password: hash('12345'),
        email: 'hafidz@mail.com',
        role: 'Buyer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users');
  },
};
