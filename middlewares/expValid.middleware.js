const { validationResult } = require('express-validator')

module.exports = function validation(req, _res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        throw errors;
    }
};
