
const router = require('express').Router();
const OrdersClass = require('../../controller/order.controller');
const validateTokenUser = require('../../middlewares/auth.middleware.js');
const validateToken_Admin = require('../../middlewares/authAdmin.middleware.js');
const multer = require('multer');

const OrderController = new OrdersClass();

// ======================== GET ALL ========================
router.get('/show', async (req, res, next) => {
    try {
        const queries = req.query;
        const orders = await OrderController.getAll(queries.page, queries);
        res.json({
            data: orders,
            statusNum: getSuc,
            success: true,
            msg: '',
        });
    } catch (err) {
        return next({
            ...err,
            statusNum: getErr,
            success: false,
            msg: err.message || 'حدث خطأ في عرض البيانات',
        });
    }
});

// ======================== GET ALL ========================
router.get('/show/:orderID', async (req, res) => {
    try {
        const { orderID } = req.params;
        const { userId } = res?.locals;
        const order = await OrderController.getOne(orderID, userId);
        res.json({
            data: order,
            statusNum: getSuc,
            success: true,
            msg: '',
        });
    } catch {
        next({
            ...err,
            statusNum: getErr,
            success: false,
            msg: err.message || 'حدث خطأ، برجاء اعادة المحاولة',
        });
    }
});

// ======================== ADD ONE ========================
router.post('/store', async (req, res, next) => {
    try {
        const { orderData, products } = await req.body;
        const order = await OrderController.create(
            orderData,
            products
        );
        res.json({
            data: order,
            statusNum: postSuc,
            success: true,
            msg: 'تم إضافة الطلب بنجاح',
        });
    } catch (err) {
        next({
            ...err,
            success: false,
            msg:
                err.message || 'حدث خطأ، لم تكتمل العملية برجاء اعادة المحاولة',
        });
    }
});

// ======================== UPDATE ========================
router.put(
    '/update/:orderId',
    async (req, res, next) => {
        try {
            const { orderData, featuresData } = await req.body;
            const orderId = req.params;
            const order = await OrderController.update(
                orderId,
                orderData,
                featuresData,
                req.files
            );
            res.json({
                data: order,
                statusNum: postSuc,
                success: true,
                msg: 'تم تعديل الطلب بنجاح',
            });
        } catch (err) {
            next({
                ...err,
                success: false,
                msg:
                    err.message ||
                    'حدث خطأ، لم تكتمل العملية برجاء اعادة المحاولة',
            });
        }
    }
);

// ======================== DELETE ========================
router.delete('/:orderID', async (req, res, next) => {
    try {
        const { orderID } = req.params;
        const order = await OrderController.delete(orderID);
        res.json({
            data: order,
            statusNum: postSuc,
            success: true,
            msg: 'تم حذف الطلب',
        });
    } catch (err) {
        next({
            ...err,
            success: false,
            msg:
                err.message || 'حدث خطأ، لم تكتمل العملية برجاء اعادة المحاولة',
        });
    }
});

module.exports = router;
