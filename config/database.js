require('dotenv').config

module.exports = {
    "development": {
        "username": process.env.DB_USER_DEV,
        "database": process.env.DB_NAME_DEV,
        "password": process.env.DB_PASSWORD_DEV,
        "host": process.env.DB_HOST_DEV,
        "dialect": "mysql",
        "logging": false
    },
    "test": {
        "username": "root",
        "database": "ecommerce_db",
        "password": "erp-daftara111",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "logging": false
    },
    "production": {
        "username": process.env.DB_USER_PROD,
        "database": process.env.DB_NAME_PROD,
        "password": process.env.DB_PASSWORD_PROD,
        "host": process.env.DB_HOST_PROD,
        "dialect": "mysql",
        "logging": false
    }
}
