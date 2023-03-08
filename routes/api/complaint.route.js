const router = require('express').Router();
const CompsClass = require('../../controller/complaint.controller');
const validateTokenUser = require('../../middlewares/auth.middleware.js');
const validateToken_Admin = require('../../middlewares/authAdmin.middleware.js');

const CompController = new CompsClass();

router.get('/show', validateToken_Admin, async (req, res, next) => {
    try {
        const queries = req.query;
        const { page } = req.params;
        const comps = await CompController.getAll(queries.page, queries);
        res.json({
            data: comps,
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

router.get('/show/:compID', validateToken_Admin, async (req, res) => {
    try {
        const { compID } = req.params;
        const { userId } = res?.locals;
        const comp = await CompController.getOne(compID, userId);
        res.json({
            data: comp,
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
router.post('/store', validateTokenUser, async (req, res, next) => {
    try {
        const newComp = await req.body;
        const { userID } = res?.locals;
        const comp = await CompController.create(newComp, userID);
        res.json({
            data: comp,
            statusNum: postSuc,
            success: true,
            msg: 'تم إضافة الشكوى بنجاح',
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
	حذف شكوى 
*/
router.delete(
    '/destroy/:compID',
    validateToken_Admin,
    async (req, res, next) => {
        try {
            const { compID } = req.params;
            const { userId } = res?.locals;
            const comp = await CompController.delete(compID, userId);
            res.json({
                data: comp,
                statusNum: postSuc,
                success: true,
                msg: 'تم حذف الشكوى بنجاح',
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
