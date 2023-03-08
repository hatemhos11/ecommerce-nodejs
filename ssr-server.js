const express = require('express');
const next = require('next');
const configMiddlewares = require('./server/middlewares/config.middlewares');
const errorHandler = require('./server/middlewares/errorHandler.middleware');
const GLOBALS = require('./server/utils/globals');

const api = require('./server/routes/index');
const { PORT } = require('./server/config/env');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        GLOBALS();

        // Main Middlewares
        configMiddlewares(server);

        // Main API Router && body-parser
        server.use(express.json());
        server.use('/api/v1', api);
        server.use('/images-static', express.static('server/images/static_images'));
        server.use('/images-products', express.static('server/products_images'));


        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.use(errorHandler);

        server.listen(PORT, (err) => {
            if (err) throw err;
            console.log('> Ready on http://localhost:3000');
        });
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    });
