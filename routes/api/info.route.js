const router = require('express').Router();
const InfosClass = require('../../controller/info.controller');
// const validateTokenUser = require('../../middlewares/auth.middleware.js');
const validateToken_Admin = require('../../middlewares/authAdmin.middleware.js');

const InfoController = new InfosClass();

router.get('/show', async (req, res) => {
    try {
        const info = await InfoController.getOne();
        res.json({
            data: info,
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

// ======================== UPDATE ========================
// ======================== UPDATE ========================
router.put('/update', validateToken_Admin, async (req, res, next) => {
    try {
        const newInfo = await req.body;
        const info = await InfoController.update(newInfo);
        res.json({
            data: info,
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

module.exports = router;