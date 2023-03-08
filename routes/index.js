const express = require('express');
// Routes
const userRoute = require('./api/user.route');
const adminRoute = require('./api/admin.route');
const productRoute = require('./api/product.route');
const categoryRoute = require('./api/category.route');
const subCatRoute = require('./api/subcategory.route');
const complaintRoute = require('./api/complaint.route');
const tagRoute = require('./api/tag.route');
const brandRoute = require('./api/brand.route');
const orderRoute = require('./api/order.route');
const optionRoute = require('./api/option.route');
// const reportRoute = require('./api/report.route');

const mainRouter = express.Router();

mainRouter.use('/users', userRoute);
mainRouter.use('/admins', adminRoute);
mainRouter.use('/products', productRoute);
mainRouter.use('/categories', categoryRoute);
mainRouter.use('/sub-categories', subCatRoute);
mainRouter.use('/complaints', complaintRoute);
mainRouter.use('/tags', tagRoute);
mainRouter.use('/brands', brandRoute);
mainRouter.use('/order', orderRoute);
mainRouter.use('/option', optionRoute);
// mainRouter.use('/reports', reportRoute);

module.exports = mainRouter;
