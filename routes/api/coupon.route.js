const router = require('express').Router();
const CouponsClass = require('../../controller/coupon.controller');
// const validateTokenUser = require('../../middlewares/auth.middleware.js');
const validateToken_Admin = require('../../middlewares/authAdmin.middleware.js');

const CouponController = new CouponsClass();

router.get('/show', validateToken_Admin, async (req, res, next) => {
    try {
        const queries = req.query;
        const coupons = await CouponController.getAll(queries.page, queries);
        res.json({
            data: coupons,
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

router.get('/show/:couponID', async (req, res) => {
    try {
        const { couponID } = req.params;
        const coupon = await CouponController.getOne(couponID);
        res.json({
            data: coupon,
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
// ======================== ADD ONE ========================
router.post('/store', validateToken_Admin, async (req, res, next) => {
    try {
        const newCoupon = await req.body;
        const coupon = await CouponController.create(newCoupon);
        res.json({
            data: coupon,
            statusNum: postSuc,
            success: true,
            msg: 'تم إضافة البطاقة بنجاح',
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
// ======================== UPDATE ========================
router.put('/update/:couponId', validateToken_Admin, async (req, res, next) => {
    try {
        const newCoupon = await req.body;
        const { couponID } = req.params;
        const coupon = await CouponController.update(newCoupon, couponID);
        res.json({
            data: coupon,
            statusNum: postSuc,
            success: true,
            msg: 'تم إضافة البطاقة بنجاح',
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
// ======================== DELETE ========================
router.delete(
    '/destroy/:couponID',
    validateToken_Admin,
    async (req, res, next) => {
        try {
            const { couponID } = req.params;
            const coupon = await CouponController.delete(couponID);
            res.json({
                data: coupon,
                statusNum: postSuc,
                success: true,
                msg: 'تم حذف البطاقة',
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

module.exports = router;
