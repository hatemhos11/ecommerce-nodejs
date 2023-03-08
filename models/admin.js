'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Admin.init(
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
        },
        {
            hooks: {
                beforeSave: async (admin, options) => {
                    const salt = await bcrypt.genSalt(6);
                    admin.password = await bcrypt.hash(admin.password, salt);
                },
                beforeCreate: async (admin, options) => {
                    const salt = await bcrypt.genSalt(6);
                    admin.password = await bcrypt.hash(admin.password, salt);
                },
                beforeUpdate: async (admin, options) => {
                    const salt = await bcrypt.genSalt(6);
                    admin.password = await bcrypt.hash(admin.password, salt);
                },
            },
            sequelize,
            modelName: 'Admin',
        }
    );
    return Admin;
};
