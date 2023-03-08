const router = require('express').Router();
const TagsClass = require('../../controller/tag.controller.js');
const validateTokenUser = require('../../middlewares/auth.middleware.js');
const validateTokenAdmin = require('../../middlewares/authAdmin.middleware.js');
const validateToken_Admin = require('../../middlewares/authAdmin.middleware.js');

const TagController = new TagsClass();

router.get('/show', async (req, res, next) => {
    try {
        const queries = req.query;
        const tags = await TagController.getAll(
            queries.page,
            queries
        );
        res.json({
            data: tags,
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

router.get('/show/:tagID', async (req, res) => {
    try {
        const { tagID } = req.params;
        const { userId } = res?.locals;
        const tag = await TagController.getOne(tagID, userId);
        res.json({
            data: tag,
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
        const newTag = await req.body;
        const tag = await TagController.create(newTag);
        res.json({
            data: tag,
            statusNum: postSuc,
            success: true,
            msg: 'تم إضافة الوسم بنجاح',
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
router.put('/update/:tagId',validateTokenAdmin, async (req, res, next) => {
    try {
        const newTag = await req.body;
        const tag = await TagController.update(newTag);
        res.json({
            data: tag,
            statusNum: postSuc,
            success: true,
            msg: 'تم إضافة الوسم بنجاح',
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
	حذف وسم 
*/
router.delete(
    '/destroy/:tagID',
    validateToken_Admin,
    async (req, res, next) => {
        try {
            const { tagID } = req.params;
            const tag = await TagController.delete(tagID);
            res.json({
                data: tag,
                statusNum: postSuc,
                success: true,
                msg: 'تم حذف الوسم بنجاح',
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
