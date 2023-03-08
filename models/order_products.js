'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order_products.init(
      {
          orderId: DataTypes.INTEGER,
          productId: DataTypes.INTEGER,
          qty: DataTypes.INTEGER,
          discount: DataTypes.DECIMAL(9, 2),
          pur_price: DataTypes.DECIMAL(9, 2),
          price: DataTypes.DECIMAL(9, 2),
          totalPrice: DataTypes.DECIMAL(9, 2),
      },
      {
          sequelize,
          modelName: 'order_products',
      }
  );
  return order_products;
};