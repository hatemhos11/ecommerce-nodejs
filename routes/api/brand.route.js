const router = require('express').Router();
const BrandsClass = require('../../controller/brand.controller');
const validateTokenUser = require('../../middlewares/auth.middleware.js');
const validateToken_Admin = require('../../middlewares/authAdmin.middleware.js');

const BrandController = new BrandsClass();

router.get('/show', validateToken_Admin, async (req, res, next) => {
    try {
        const queries = req.query;
        const brands = await BrandController.getAll(
            queries.page,
            queries
        );
        res.json({
            data: brands,
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

router.get('/show/:brandID', validateToken_Admin, async (req, res) => {
    try {
        const { brandID } = req.params;
        const { userId } = res?.locals;
        const brand = await BrandController.getOne(brandID, userId);
        res.json({
            data: brand,
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
router.post('/store', async (req, res, next) => {
    try {
        const newBrand = await req.body;
        const brand = await BrandController.create(newBrand);
        res.json({
            data: brand,
            statusNum: postSuc,
            success: true,
            msg: 'تم إضافة العلامة تجارية بنجاح',
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
router.put('/update/:brandId', async (req, res, next) => {
    try {
        const newBrand = await req.body;
        const brand = await BrandController.update(newBrand);
        res.json({
            data: brand,
            statusNum: postSuc,
            success: true,
            msg: 'تم إضافة العلامة تجارية بنجاح',
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

/*----------------------
	حذف علامة تجارية 
*/
router.delete(
    '/destroy/:brandID',
    validateToken_Admin,
    async (req, res, next) => {
        try {
            const { brandID } = req.params;
            const brand = await BrandController.delete(brandID);
            res.json({
                data: brand,
                statusNum: postSuc,
                success: true,
                msg: 'تم حذف العلامة تجارية',
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
