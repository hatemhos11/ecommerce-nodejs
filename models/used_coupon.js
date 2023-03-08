'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Used_coupon extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Used_coupon.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    key: 'id',
                    model: 'coupons',
                },
            },
            couponCode: {
                type: DataTypes.STRING,
                references: {
                    key: 'code',
                    model: 'coupons',
                },
            },
        },
        {
            sequelize,
            modelName: 'used_coupon',
        }
    );
    return Used_coupon;
};
