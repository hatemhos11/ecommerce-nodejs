'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class complaint extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.belongsTo(models.User);
        }
    }
    complaint.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                references: { key: 'id', model: 'Users' },
            },
            code: DataTypes.STRING,
            title: DataTypes.STRING,
            desc: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'complaint',
        }
    );
    return complaint;
};
