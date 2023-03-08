const jwt = require('jsonwebtoken');

const { JWT_PASS } = process.env;

const authError = (next) => {
    const error = new Error('الصفحة التي طلبتها غير موجودة');
    error.status = 401;
    error.statusNum = 'E401';
    error.success = false;
    next(error);
};

const validateTokenAdmin = (req, res, next) => {
    try {
        const header = req.get('Authorization');
        if (header) {
            const token = header;
            if (token) {
                const decode = jwt.verify(token, JWT_PASS);
                if (decode && decode.role === 'admin'.toLowerCase()) {
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

module.exports = validateTokenAdmin;
