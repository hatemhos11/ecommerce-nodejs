const errorHandler = (error, _req, res, _next) => {
    const statusCode = error.status || 500;
    const statusNum = error.statusNum || 'E100';
    const success = error.success;
    const msg = error.msg || 'حدث خطأ ما، برجاء اعد المحاولة';
    const errors = error.errors;
    // console.log(error)
    return res.status(statusCode).json({ msg, statusNum, success, errors });
};

module.exports = errorHandler;
