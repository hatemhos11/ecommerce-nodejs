const router = require('express').Router();
const subCatClass = require('../../controller/subcategory.controller');
const validateTokenUser = require('../../middlewares/auth.middleware.js');
const validateToken_Admin = require('../../middlewares/authAdmin.middleware.js');

const subCatController = new subCatClass();

router.get('/show', validateToken_Admin, async (req, res, next) => {
    try {
        const queries = req.query;
        const subCats = await subCatController.getAll(queries.page, queries);
        res.json({
            data: subCats,
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
        const { subCategoryID } = req.params;
        const { userId } = res?.locals;
        const subCat = await subCatController.getOne(subCategoryID, userId);
        res.json({
            data: subCat,
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
        const newSubCategory = await req.body;
        const subCat = await subCatController.create(newSubCategory);
        res.json({
            data: subCat,
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
router.put('/update/:subCategoryId', async (req, res, next) => {
    try {
        const newCategory = await req.body;
        const { subCategoryId } = req.params;
        const subCat = await subCatController.update(
            newCategory,
            subCategoryId
        );
        res.json({
            data: subCat,
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
            const { subCategoryID } = req.params;
            const subCat = await subCatController.delete(subCategoryID);
            res.json({
                data: subCat,
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
