'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class coupon extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        loogCon() {
            console.log('fucken bitch');
        }
        static associate(models) {
            // define association here
        }
    }
    coupon.init(
        {
            code: DataTypes.STRING,
            couponType: DataTypes.ENUM(['product', 'category', 'order']),
            isPercentage: DataTypes.BOOLEAN,
            value: DataTypes.DECIMAL(9, 2),
            productId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    key: 'id',
                    model: 'Products',
                },
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    key: 'id',
                    model: 'Categories',
                },
            },
            isActive: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'coupon',
        }
    );
    return coupon;
};
