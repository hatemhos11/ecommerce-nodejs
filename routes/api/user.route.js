const router = require('express').Router();
const UsersClass = require('../../controller/user.controller.js');
const validateTokenUser = require('../../middlewares/auth.middleware.js');
const validateToken_Admin = require('../../middlewares/authAdmin.middleware.js');
const {
    UserSignupChain,
    UserLoginChain,
} = require('../../middlewares/validations/user.valid');
const expValid = require('../../middlewares/expValid.middleware');

const userController = new UsersClass();

// ======================== GET USERS ========================
// ======================== GET USERS ========================
router.get('/show', validateToken_Admin, async (req, res, next) => {
    try {
        const users = await userController.getAll(page);
        res.redirect('/');
        res.json({
            data: users,
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

router.get('/me', validateTokenUser, async (req, res, next) => {
    try {
        const { userID } = res?.locals;
        const user = await userController.getOne(userID);
        res.json({ data: user, statusNum: getSuc, success: true });
    } catch (err) {
        console.log('err', err?.message);
        next({
            ...err,
            success: false,
            msg: err?.message || 'لا يمكن عرض البيانات الان',
        });
    }
});
router.get('/show/:userID', validateToken_Admin, async (req, res, next) => {
    try {
        const { userID } = req.params;
        const user = await userController.getOne(userID);
        res.json({ data: user, statusNum: getSuc, success: true });
    } catch (err) {
        next({
            ...err,
            statusNum: getErr,
            success: false,
            msg: err.message || 'حدث خطأ يمكنك إعادة المحاولة',
        });
    }
});

// ======================== SIGNUP ========================
// ======================== SIGNUP ========================
router.post('/signup', UserSignupChain, expValid, async (req, res, next) => {
    try {
        const newUser = await req.body;
        const user = await userController.signUp(newUser);
        res.json({
            data: user,
            statusNum: postSuc,
            success: true,
            msg: 'تم التسجيل بنجاح',
        });
    } catch (err) {
        next({
            ...err,
            success: false,
            msg:
                err.message || 'حدث خطأ اثناء التسجيل برجاء التأكد من المدخلات',
        });
    }
});

// ================== USER ACTIVATE ROUTE ==================
// ================== USER ACTIVATE ROUTE ==================
router.put('/confirm', async (req, res, next) => {
    try {
        const { code, email } = await req.body;
        const info = await userController.activateEmail(code, email);

        res.json({
            data: info,
            statusNum: postSuc,
            success: true,
            msg: 'تم تفعيل الحساب بنجاح',
        });
    } catch (err) {
        next({
            ...err,
            success: false,
            msg:
                err.message || 'حدث خطأ اثناء التفعيل برجاء التأكد من المدخلات',
        });
    }
});
router.post('/resend', async (req, res, next) => {
    try {
        const { email } = await req.body;
        const info = await userController.resendConfirmCode(email);

        res.json({
            data: info,
            statusNum: postSuc,
            success: true,
            msg: 'تم تفعيل الحساب بنجاح',
        });
    } catch (err) {
        next({
            ...err,
            success: false,
            msg:
                err.message || 'حدث خطأ اثناء التفعيل برجاء التأكد من المدخلات',
        });
    }
});

// ======================== LOGIN ========================
// ======================== LOGIN ========================
router.post('/login', UserLoginChain, expValid, async (req, res, next) => {
    try {
        const { email, password } = await req.body;

        const data = await userController.login(email, password);
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

// ======================== UPDATE ========================
// ======================== UPDATE ========================
router.put('/update', validateTokenUser, async (req, res, next) => {
    try {
        const newUser = await req.body;
        const { userID } = res?.locals;

        const result = await userController.update(newUser, userID);
        res.json({
            data: result,
            statusNum: postSuc,
            success: true,
            msg: 'تم التعديل بنجاح',
        });
    } catch {
        next({
            ...err,
            success: false,
            msg: err.message || 'خطأ برجاء إعادة المحاولة',
        });
    }
});
router.put('/change-password', validateTokenUser, async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = await req.body;
        const { userID } = res?.locals;

        const user = await userController.changePassword(
            oldPassword,
            newPassword,
            userID
        );
        res.json({
            data: user,
            statusNum: postSuc,
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
router.put(
    '/change-status/:userId',
    validateToken_Admin,
    async (req, res, next) => {
        try {
            const { newActiveValue } = await req.body;
            const { userID } = req.params;

            const user = await userController.changeActivate(
                newActiveValue,
                userID
            );
            res.json({
                data: user,
                statusNum: postSuc,
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
    }
);

module.exports = router;
