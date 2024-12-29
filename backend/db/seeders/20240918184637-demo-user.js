'use strict';
const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await User.bulkCreate([
      {
        username: 'Demo-lition',
        firstName: 'Demo',
        lastName: 'lition',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: 'JohnSmith',
        firstName: 'John',
        lastName: 'Smith',
        email: 'johnsmith@user.io',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        username: 'SarahBrown',
        firstName: 'Sarah',
        lastName: 'Brown',
        email: 'sarahbrown@user.io',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        username: 'BrandonJones',
        firstName: 'Brandon',
        lastName: 'Jones',
        email: 'brandonjones@user.io',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        username: 'MarcyMiller',
        firstName: 'Marcy',
        lastName: 'Miller',
        email: 'marcymiller@user.io',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        username: 'JacobTaylor',
        firstName: 'Jacob',
        lastName: 'Taylor',
        email: 'jacobtaylor@user.io',
        hashedPassword: bcrypt.hashSync('password6')
      },
      {
        username: 'JoshMoore',
        firstName: 'Josh',
        lastName: 'Moore',
        email: 'joshmoore@user.io',
        hashedPassword: bcrypt.hashSync('password7')
      },
      {
        username: 'BrianWilliams',
        firstName: 'Brian',
        lastName: 'Williams',
        email: 'brianwilliams@user.io',
        hashedPassword: bcrypt.hashSync('password8')
      },
      {
        username: 'VictoriaParker',
        firstName: 'Victoria',
        lastName: 'Parker',
        email: 'victoriaparker@user.io',
        hashedPassword: bcrypt.hashSync('password9')
      },
      {
        username: 'MikeRogers',
        firstName: 'Mike',
        lastName: 'Rogers',
        email: 'mikerogers@user.io',
        hashedPassword: bcrypt.hashSync('password10')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: [
        'Demo-lition', 
        'JohnSmith', 
        'SarahBrown', 
        'BrandonJones', 
        'MarcyMiller',
        'JacobTaylor',
        'JoshMoore',
        'BrianWilliams',
        'VictoriaParker',
        'MikeRogers',
      ] }
    }, {});
  }
};
