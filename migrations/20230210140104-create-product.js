'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            barcode: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            code: {
                type: Sequelize.STRING,
                unique: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            brandId: {
                type: Sequelize.INTEGER,
                references: {
                    key: 'id',
                    model: 'Brands',
                },
            },
            desc: {
                type: Sequelize.STRING,
            },
            quantity: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            categoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'Categories',
                },
            },
            subCategoryId: {
                type: Sequelize.INTEGER,
                references: {
                    key: 'id',
                    model: 'sub_categories',
                },
            },
            pur_price: {
                type: Sequelize.DECIMAL(9, 2),
                allowNull: false,
            },
            sell_price: {
                type: Sequelize.DECIMAL(9, 2),
            },
            discount: {
                type: Sequelize.DECIMAL(9, 2),
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            rate: Sequelize.DECIMAL(1, 1),
            sales: Sequelize.INTEGER,
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
        await queryInterface.dropTable('Products');
    },
};
