'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'Products',
            [
                {
                    id: 1,
                    barcode: '12345',
                    code: 'p-1',
                    name: 'مروحة',
                    desc: 'مروحة سقف مش حلوه محدش يشتريها',
                    quantity: 40,
                    BrandId: 2,
                    categoryId: 1,
                    subCategoryId: 1,
                    pur_price: 200,
                    sell_price: 230,
                    // isStcSellPrice: true,
                    // profitType: true,
                    // profit: 20,
                    discount: 0,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 2,
                    barcode: '123456',
                    BrandId: 1,
                    code: 'p-2',
                    name: 'نجفة',
                    desc: 'نجفة سقف بردو مش حلوه محدش يشتريها',
                    quantity: 40,
                    categoryId: 1,
                    subCategoryId: 1,
                    pur_price: 200,
                    sell_price: 230,
                    // isStcSellPrice: true,
                    // profitType: true,
                    // profit: 20,
                    discount: 0,
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );

        await queryInterface.bulkInsert(
            'features',
            [
                {
                    id: 1,
                    productId: 1,
                    name: 'اسم المخاصية',
                    key: 'مقاس المروحة',
                    desc: 'مروحة 2×2 ووهاهاهيسشمبسنتب',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 2,
                    productId: 1,
                    name: 'اسم المخاصية التانية',
                    key: 'خاصية 2',
                    desc: 'مروحة',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 3,
                    productId: 2,
                    name: 'خاصية ',
                    key: 'مقاس النجفة',
                    desc: 'مروحة 2×2 هخويخو',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Products', null, { id: 1 });
    },
};
