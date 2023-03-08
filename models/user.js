'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.complaint);
        }
    }
    User.init(
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    arg: true,
                    msg: 'البريد الإلكتروني مسجل من قبل',
                },
            },
            password: {
                type: DataTypes.STRING,
            },
            isPaymentActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            confirmationCode: {
                type: DataTypes.STRING,
                unique: true,
            },
            expirationCode: {
                type: DataTypes.DATE,
            },
            phone: {
                type: DataTypes.STRING,
                unique: {
                    arg: true,
                    msg: 'الهاتف مسجل مسبقا',
                },
            },
            city: {
                type: DataTypes.STRING,
            },
            address: {
                type: DataTypes.STRING,
            },
            address2: {
                type: DataTypes.STRING,
            },
            age: {
                type: DataTypes.INTEGER,
            },
            gender: {
                type: DataTypes.BOOLEAN,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            hooks: {
                beforeCreate: async (user, options) => {
                    const salt = await bcrypt.genSalt(6);
                    user.password = await bcrypt.hash(user.password, salt);
                },
                beforeUpdate: async (user, options) => {
                    const salt = await bcrypt.genSalt(6);
                    user.password = await bcrypt.hash(user.password, salt);
                },
            },
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};
