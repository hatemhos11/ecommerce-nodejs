'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Options', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            slide1: {
                type: Sequelize.STRING,
            },
            slide2: {
                type: Sequelize.STRING,
            },
            slide3: {
                type: Sequelize.STRING,
            },
            cat1: {
                type: Sequelize.INTEGER,
                references: {
                    key: 'id',
                    model: 'Categories',
                },
            },
            cat2: {
                type: Sequelize.INTEGER,
                references: {
                    key: 'id',
                    model: 'Categories',
                },
            },
            cat3: {
                type: Sequelize.INTEGER,
                references: {
                    key: 'id',
                    model: 'Categories',
                },
            },
            cat4: {
                type: Sequelize.INTEGER,
                references: {
                    key: 'id',
                    model: 'Categories',
                },
            },
            cat5: {
                type: Sequelize.INTEGER,
                references: {
                    key: 'id',
                    model: 'Categories',
                },
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
        await queryInterface.dropTable('Options');
    },
};
