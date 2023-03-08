'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product_tag extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Product_tag.init(
        {
            ProductId: {
                type: DataTypes.INTEGER,
                references: {
                    key: 'id',
                    model: 'Products',
                },
            },
            TagId: {
                type: DataTypes.INTEGER,
                references: {
                    key: 'id',
                    model: 'Tags',
                },
            },
        },
        {
            sequelize,
            modelName: 'Product_tag',
        }
    );
    return Product_tag;
};
