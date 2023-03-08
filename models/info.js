'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class info extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    info.init(
        {
            vatNum: DataTypes.INTEGER,
            companyName: DataTypes.STRING,
            ownerName: DataTypes.STRING,
            phone: DataTypes.STRING,
            commercialReg: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'info',
        }
    );
    return info;
};
