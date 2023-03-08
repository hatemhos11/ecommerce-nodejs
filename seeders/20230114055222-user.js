'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Users',
            [
                {
                    id: 1,
                    firstName: 'hatem',
                    lastName: 'hosni',
                    email: 'hatem@gmail.com',
                    password: '12345',
                    phone: '01093358',
                    address: 'makka',
                    city: 'makka',
                    age: 23,
                    gender: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 2,
                    firstName: 'ammar',
                    lastName: 'ayman',
                    email: 'weed@weed.com',
                    password: '112233',
                    phone: '010932949',
                    address: 'karada',
                    city: 'karada city',
                    age: 22,
                    gender: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, { id: [1,2] });
    },
};
