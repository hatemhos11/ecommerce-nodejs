const router = require('express').Router();
const CategoriesClass = require('../../controller/category.controller');
const validateTokenUser = require('../../middlewares/auth.middleware.js');
const validateToken_Admin = require('../../middlewares/authAdmin.middleware.js');

const CategoryController = new CategoriesClass();

router.get('/show', validateToken_Admin, async (req, res, next) => {
    try {
        const queries = req.query;
        const categories = await CategoryController.getAll(
            queries.page,
            queries
        );
        res.json({
            data: categories,
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

router.get('/show/:categoryID', validateToken_Admin, async (req, res) => {
    try {
        const { categoryID } = req.params;
        const { userId } = res?.locals;
        const category = await CategoryController.getOne(categoryID, userId);
        res.json({
            data: category,
            statusNum: getSuc,
            success: true,
            msg: '',
        });
    } catch(err) {
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
        const newCategory = await req.body;
        const category = await CategoryController.create(newCategory);
        res.json({
            data: category,
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
// ======================== UPDATE ========================
// ======================== UPDATE ========================
router.put('/update/:categoryId', async (req, res, next) => {
    try {
        const newCategory = await req.body;
        const category = await CategoryController.update(newCategory);
        res.json({
            data: category,
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

/*----------------------
	حذف تصنيف 
*/
router.delete(
    '/destroy/:categoryID',
    validateToken_Admin,
    async (req, res, next) => {
        try {
            const { categoryID } = req.params;
            const category = await CategoryController.delete(categoryID);
            res.json({
                data: category,
                statusNum: postSuc,
                success: true,
                msg: 'تم حذف التصنيف',
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
