const jwt = require('jsonwebtoken');
const config = require('../config/env')

const { SECRET_TOKEN } = config;

const authError = (next) => {
    const error = new Error('يجب تسجيل الدخول اولا');
    error.status = 401;
    error.statusNum = 'E401';
    error.success = false;
    next(error);
};

const validateTokenMiddleware = (req, res, next) => {
    try {
        const header = req.get('Authorization');
        if (header) {
            const token = header;
            if (token) {
                const decode = jwt.verify(token, SECRET_TOKEN);
                if (decode) {
                    res.locals.userID = decode.id;
                    next();
                } else {
                    authError(next);
                }
            } else {
                authError(next);
            }
        } else {
            authError(next);
        }
    } catch (err) {
        authError(next);
    }
};

module.exports = validateTokenMiddleware;
