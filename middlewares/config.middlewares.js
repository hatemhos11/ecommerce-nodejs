const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

module.exports = (server) => {
    // HELMET Middleware
    // server.use(helmet());

    // CORS
    const allowedOrigins = ['http://localhost:3000'];
    server.use(
        cors({
            origin: (origin, callback) => {
                allowedOrigins.includes(origin) || !origin
                    ? callback(null, true)
                    : callback(new Error('Not allowed by CORS'));
            },
            optionsSuccessStatus: 200,
        })
    );

    // Rate Limit
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 1500,
        standardHeaders: false,
        legacyHeaders: false,
    });
    server.use(limiter);

    // Handle Crash Server
    process.on('uncaughtException', (error, origin) => {
        console.log('----- Uncaught exception -----');
        console.log('error', error);
        console.log('Exception origin', origin);
    });
    process.on('unhandledRejection', (reason, promise) => {
        console.log('----- Unhandled Rejection at -----');
        console.log('promise:', promise);
        console.log('reason:', reason);
    });
};