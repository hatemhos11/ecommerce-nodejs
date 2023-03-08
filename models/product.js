'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            // Category Associate
            this.belongsTo(models.Category);

            // Sub-category Associate
            this.belongsTo(models.sub_category);

            // Brand Associate
            this.belongsTo(models.Brand);

            // Features Associate
            this.hasMany(models.features, { onDelete: 'CASCADE' });

            // Images Associate
            this.hasMany(models.product_images, { onDelete: 'CASCADE' });
        }
    }
    Product.init(
        {
            barcode: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    arg: true,
                    message: 'الباركود مسجل من قبل!',
                },
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    arg: true,
                    message: 'اسم المنتج مسجل من قبل!',
                },
            },
            code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    arg: true,
                    message: 'كود المنتج مسجل من قبل',
                },
            },
            quantity: DataTypes.INTEGER,
            desc: DataTypes.STRING,
            brandId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'Brands',
                },
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    key: 'id',
                    model: 'Categories',
                },
            },
            subCategoryId: {
                type: DataTypes.INTEGER,
                references: {
                    key: 'id',
                    model: 'sub_categories',
                },
            },
            pur_price: DataTypes.DECIMAL(9, 2),
            sell_price: DataTypes.DECIMAL(9, 2),
            discount: DataTypes.DECIMAL(9, 2),
            isActive: DataTypes.BOOLEAN,
            rate: { type: DataTypes.DECIMAL(9, 2), defaultValue: 0 },
            sales: { type: DataTypes.INTEGER, defaultValue: 0 },
            // isStcSellPrice: DataTypes.BOOLEAN,
            // profit: DataTypes.DECIMAL(9, 2),
            // profitType: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Product',
        }
    );
    return Product;
};
