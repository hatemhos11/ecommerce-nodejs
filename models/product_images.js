'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class product_images extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    product_images.init(
        {
            productId: {
                type: DataTypes.INTEGER,
                references: {
                    key: 'id',
                    model: 'Products',
                },
            },
            image: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'product_images',
        }
    );
    return product_images;
};
