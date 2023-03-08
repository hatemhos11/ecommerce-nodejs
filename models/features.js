'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class features extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.Product);
        }
    }
    features.init(
        {
            productId: {
                type: DataTypes.INTEGER,
                references: {
                    key: 'id',
                    model: 'Products',
                },
            },
            name: DataTypes.STRING,
            key: DataTypes.STRING,
            desc: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'features',
        }
    );
    return features;
};
