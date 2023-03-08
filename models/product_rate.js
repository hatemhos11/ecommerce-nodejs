'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_rate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product_rate.init(
      {
          rate: DataTypes.INTEGER,
          userId: {
              type: DataTypes.INTEGER,
              references: {
                  key: 'id',
                  model: 'User',
              },
          },
          productId: {
              type: DataTypes.INTEGER,
              references: {
                  key: 'id',
                  model: 'Product',
              },
          },
          comment: DataTypes.STRING,
      },
      {
          sequelize,
          modelName: 'product_rate',
      }
  );
  return product_rate;
};