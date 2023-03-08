'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('coupons', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            code: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            couponType: {
                type: Sequelize.ENUM(['product', 'category', 'order']),
                allowNull: false,
                unique: true,
            },
            isPercentage: {
                type: Sequelize.BOOLEAN,
            },
            value: {
                type: Sequelize.DECIMAL(9, 2),
            },
            productId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    key: 'id',
                    model: 'Products',
                },
            },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    key: 'id',
                    model: 'Categories',
                },
            },
            isActive: Sequelize.BOOLEAN,
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
        await queryInterface.dropTable('coupons');
    },
};
