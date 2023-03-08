'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Order.init(
        {
            code: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    arg: true,
                    msg: 'خطأ في المعاملة برجاء إعادة المحاولة',
                },
            },
            userId: {
                type: DataTypes.INTEGER,
                references: {
                    key: 'id',
                    model: 'Users',
                },
            },
            status: {
                type: DataTypes.ENUM([
                    'pending',
                    'shipped',
                    'failed',
                    'success',
                ]),
                allowNull: false,
            },
            couponId: DataTypes.INTEGER,
            totalPrice: {
                type: DataTypes.DECIMAL(9, 2),
                allowNull: false,
            },
            shipExpenses: {
                type: DataTypes.DECIMAL(9, 2),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Order',
        }
    );
    return Order;
};
