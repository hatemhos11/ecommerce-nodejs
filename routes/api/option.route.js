const router = require('express').Router();
const multer = require('multer');
const OptionsClass = require('../../controller/homePage.controller');
const validateToken_Admin = require('../../middlewares/authAdmin.middleware.js');
const upload = multer();

const OptionController = new OptionsClass();

router.get('/show', async (req, res, next) => {
    try {
        const slides = await OptionController.getSlides();
        // const categories = await OptionController.getCats();
        res.json({
            data: {slides} ,
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

// ======================== UPDATE ========================
// ======================== UPDATE ========================
router.put(
    '/update-slide/:id',
    upload.single('slide'),
    async (req, res, next) => {
        try {
            const file = req.file;
            const { id } = req.params;
            const {oldFilename} = await req.body
            const slide = await OptionController.updateSlide(
                id,
                file,
                oldFilename
            );
            res.json({
                data: slide,
                statusNum: postSuc,
                success: true,
                msg: 'تم إضافة البطاقة بنجاح',
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
