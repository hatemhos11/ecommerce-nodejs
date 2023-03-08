'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            firstName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lastName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: {
                    arg: true,
                    msg: 'البريد الإلكتروني مسجل من قبل',
                },
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            isPaymentActive: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            // confirmation
            confirmationStatus: {
                type: Sequelize.ENUM('pending', 'active'),
                defaultValue: 'pending',
            },
            confirmationCode: {
                type: Sequelize.STRING,
                unique: true,
            },
            expirationCode: {
                type: Sequelize.DATE,
            },
            // ---
            phone: {
                type: Sequelize.STRING,
                unique: true,
            },
            city: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING,
            },
            address2: {
                type: Sequelize.STRING,
            },
            age: {
                type: Sequelize.INTEGER,
            },
            gender: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    },
};
