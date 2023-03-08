'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('infos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            vatNum: {
                type: Sequelize.INTEGER,
            },
            vatValue: {
                type: Sequelize.DECIMAL(3, 2),
                validate: {
                    customValidator(value) {
                        if (value === null || value < 0 || value >= 100) {
                            throw new Error(
                                ' 100 القيمة يجب ان تكون اكبر من او تساوي الصفر واقل من '
                            );
                        }
                    },
                },
            },
            companyName: {
                type: Sequelize.STRING,
            },
            commercialReg: {
                type: Sequelize.STRING,
            },
            ownerName: {
                type: Sequelize.STRING,
            },
            phone: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('infos');
    },
};
