'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Admins',
            [
                {
                    id: 1,
                    email: 'hatem@gmail.com',
                    password: '123123',
                    firstName: 'hatem111',
                    lastName: '',
                    phone: '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Admins', null, { id: 1 });
    },
};
