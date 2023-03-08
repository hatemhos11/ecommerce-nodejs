'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            code: {
                type: Sequelize.STRING,
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    key: 'id',
                    model: 'Users',
                },
            },
            status: {
                type: Sequelize.ENUM([
                    'pending',
                    'shipped',
                    'failed',
                    'success',
                ]),
            },
            couponId: {
                type: Sequelize.INTEGER,
            },
            totalPrice: {
                type: Sequelize.DECIMAL(9, 2),
            },
            costPrice: {
                type: Sequelize.DECIMAL(9, 2),
            },
            shipExpenses: {
                type: Sequelize.DECIMAL(9, 2),
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
        await queryInterface.dropTable('Orders');
    },
};
