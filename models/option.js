'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Option extends Model {

        static associate(models) {
        }
    }
    Option.init(
        {
            slide1: DataTypes.STRING,
            slide2: DataTypes.STRING,
            slide3: DataTypes.STRING,
            cat1: {
                type: DataTypes.INTEGER,
                references: {
                    key: 'id',
                    model: 'Category',
                },
            },
            cat2: {
                type: DataTypes.INTEGER,
                references: {
                    key: 'id',
                    model: 'Category',
                },
            },
            cat3: {
                type: DataTypes.INTEGER,
                references: {
                    key: 'id',
                    model: 'Category',
                },
            },
            cat4: {
                type: DataTypes.INTEGER,
                references: {
                    key: 'id',
                    model: 'Category',
                },
            },
            cat5: {
                type: DataTypes.INTEGER,
                references: {
                    key: 'id',
                    model: 'Category',
                },
            },
        },
        {
            sequelize,
            modelName: 'Option',
        }
    );
    return Option;
};
