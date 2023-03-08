const router = require('express').Router();
const AdminsClass = require('../../controller/admin.controller.js');
const validateToken_Admin = require('../../middlewares/authAdmin.middleware.js');

const adminController = new AdminsClass();

router.get('/show', validateToken_Admin, async (req, res, next) => {
    try {
        const admins = await adminController.getAll(page);

        res.json({
            data: admins,
            statusNum: getSuc,
            success: true,
            msg: '',
        });
    } catch (err) {
        next({
            ...err,
            statusNum: getErr,
            success: false,
            msg: err.message || 'حدث خطأ في البيانات',
        });
    }
});

router.get('/show/me', validateToken_Admin, async (req, res, next) => {
    try {
        const adminID = await res.id;
        const admins = await adminController.getOne(adminID);

        res.json({ data: admins, statusNum: getSuc, success: true });
    } catch (err) {
        next({
            ...err,
            success: false,
            msg: err.message || 'لا يمكن عرض البيانات الان',
        });
    }
});

router.get('/show/:adminID', validateToken_Admin, async (req, res, next) => {
    try {
        const { adminID } = req.params;
        const admin = await adminController.getOne(adminID);
        res.json({ data: admin, statusNum: getSuc, success: true });
    } catch (err) {
        next({
            ...err,
            statusNum: getErr,
            success: false,
            msg: err.message || 'حدث خطأ يمكنك إعادة المحاولة',
        });
    }
});

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ تسجيل مستخدم جديد ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
router.post('/store', validateToken_Admin, async (req, res, next) => {
    try {
        const data = await req.body;
        const admin = await adminController.create(data);
        res.json({
            data: admin,
            statusNum: postSuc,
            success: true,
            msg: 'تم اضافة مستخدم جديد بنجاح',
        });
    } catch (err) {
        next({
            ...err,
            success: false,
            msg:
                err.message ||
                'حدث خطأ اثناء إضافة المستخدم برجاء اعادة المحاولة',
        });
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { adminname, password } = await req.body;
        const data = await adminController.login(adminname, password);

        res.json({
            data,
            statusNum: postSuc,
            success: true,
            msg: 'تم تسجيل الدخول بنجاح',
        });
    } catch (err) {
        next({
            ...err,
            success: false,
            msg: err.message || 'خطأ: ارسل بيانات صحيحة',
        });
    }
});

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ تعديل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
router.put('/update/:adminID', validateToken_Admin, async (req, res, next) => {
    try {
        const newAdmin = await req.body;
        const { adminID } = req.params;

        const result = await adminController.update(newAdmin, adminID);
        res.json(result);
    } catch {
        next({
            ...err,
            success: false,
            msg: err.message || 'خطأ برجاء إعادة المحاولة',
        });
    }
});
router.put('/change-password', validateToken_Admin, async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = await req.body;
        const { adminID } = res?.locals;

        const admin = await adminController.changePassword(
            oldPassword,
            newPassword,
            adminID
        );
        res.json({
            data: admin,
            data: getsuc,
            success: true,
            msg: 'تم تعديل كلمة السر',
        });
    } catch {
        next({
            ...err,
            success: false,
            msg: err.message || 'خطأ برجاء إعادة المحاولة',
        });
    }
});
router.put('/edit-status/:id', validateToken_Admin, async (req, res, next) => {
    try {
        const { newActiveValue } = await req.body;
        const { adminId } = res?.locals;
        const { id } = req.params;

        const admin = await adminController.changeActivate(
            newActiveValue,
            id,
            adminId
        );
        res.json({
            data: admin,
            data: getsuc,
            success: true,
            msg: 'تم تعديل التفعيل',
        });
    } catch {
        next({
            ...err,
            success: false,
            msg: err.message || 'خطأ برجاء إعادة المحاولة',
        });
    }
});

module.exports = router;
