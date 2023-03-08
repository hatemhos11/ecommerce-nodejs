const router = require('express').Router();
const ProductsClass = require('../../controller/product.controller');
const validateTokenUser = require('../../middlewares/auth.middleware.js');
const validateToken_Admin = require('../../middlewares/authAdmin.middleware.js');
const multer = require('multer');

const ProductController = new ProductsClass();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ======================== GET ALL ========================
router.get('/show', async (req, res, next) => {
    try {
        const queries = req.query;
        const products = await ProductController.getAll(queries.page, queries);
        res.json({
            data: products,
            statusNum: getSuc,
            success: true,
            msg: '',
        });
    } catch (err) {
        next({
            ...err,
            statusNum: getErr,
            success: false,
            msg: err.message || 'حدث خطأ في عرض البيانات',
        });
    }
});

// ======================== GET ALL ========================
router.get('/show/:productID', async (req, res, next) => {
    try {
        const { productID } = req.params;
        const { userId } = res?.locals;
        const product = await ProductController.getOne(productID, userId);
        res.json({
            data: product,
            statusNum: getSuc,
            success: true,
            msg: '',
        });
    } catch (err) {
        return next({
            ...err,
            statusNum: getErr,
            success: false,
            msg: err.message || 'حدث خطأ، برجاء اعادة المحاولة',
        });
    }
});

// ======================== ADD ONE ========================
router.post('/store', upload.array('images'), async (req, res, next) => {
    try {
        const images = req.files;
        let { productData, featuresData } = await req.body;
        const product = await ProductController.create(
            productData,
            featuresData,
            images
        );
        res.json({
            data: product,
            statusNum: postSuc,
            success: true,
            msg: 'تم إضافة التصنيف بنجاح',
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

// ======================== RATE PRODUCT ========================
router.post(
    '/rate/:productId',
    upload.array('images'),
    async (req, res, next) => {
        try {
            const { rateData } = await req.body;
            const { userId } = res?.locals;
            const { productId } = req.params;
            const rate = await ProductController.rateProduct(
                rateData,
                productId,
                userId
            );
            res.json({
                data: rate,
                statusNum: postSuc,
                success: true,
                msg: 'تم إضافة التصنيف بنجاح',
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

// ======================== UPDATE ========================
router.put(
    '/update/:productId',
    upload.array('images'),
    async (req, res, next) => {
        try {
            const { productData, featuresData } = await req.body;
            const productId = req.params;
            const product = await ProductController.update(
                productId,
                productData,
                featuresData,
                req.files
            );
            res.json({
                data: product,
                statusNum: postSuc,
                success: true,
                msg: 'تم تعديل المنتج بنجاح',
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

// ======================== INCREASE QTY ========================
router.put('/inc-qty/:productId', async (req, res, next) => {
    try {
        const { pur_price, QTY, isSamePrice } = await req.body;
        const productId = req.params;
        const product = await ProductController.incQTY(
            productId,
            QTY,
            pur_price,
            isSamePrice
        );
        res.json({
            data: product,
            statusNum: postSuc,
            success: true,
            msg: 'تم تعديل المنتج بنجاح',
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

// ======================== DELETE ========================
router.delete('/:productID', async (req, res, next) => {
    try {
        const { productID } = req.params;
        const product = await ProductController.delete(productID);
        res.json({
            data: product,
            statusNum: postSuc,
            success: true,
            msg: 'تم حذف المنتج',
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
// ======================== DEL RATE ========================
router.delete('/rate/:productId', async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { userId } = res?.locals;
        const rate = await ProductController.delete(productId, userId);
        res.json({
            data: rate,
            statusNum: postSuc,
            success: true,
            msg: 'تم حذف التقييم',
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
