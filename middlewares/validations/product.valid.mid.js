const body = require('express-validator');

const productValid = [
    body('productData.*.barcode').not().isEmpty().withMessage('الباركود فارغ'),

    body('productData.*.name').not().isEmpty().withMessage('اسم المنتج فارغ'),

    body('productData.*.brand')
        .not()
        .isEmpty()
        .withMessage('حقل العلامة التجارية فارغ'),

    body('productData.*.desc').not().isEmpty().withMessage('حقل الوصف فارغ'),

    body('productData.*.quantity')
        .not()
        .isEmpty()
        .withMessage('حقل الكمية فارغ')
        .isNumeric()
        .withMessage('الكمية يجب ان تحتوي على ارقام فقط'),

    body('productData.*.categoryId')
        .not()
        .isEmpty()
        .withMessage('اختر التصنيف'),

    body('productData.*.pur_price')
        .not()
        .isEmpty()
        .withMessage('حقل سعر الشراء فارغ')
        .isNumeric()
        .withMessage('الكمية يجب ان تحتوي على ارقام فقط'),

    body('productData.*.sell_price')
        .not()
        .isEmpty()
        .withMessage('حقل سعر البيع فارغ')
        .isNumeric()
        .withMessage('الكمية يجب ان تحتوي على ارقام فقط')
        .custom((value, { req }) => {
            if (value < req.body.pur_price) {
                throw new Error('يجب ان يكون سعر البيع اكبر من سعر الشراء');
            } else return true;
        }),

    body('productData.*.discount')
        .isNumeric()
        .withMessage('الخصم يجب ان يحتوى على ارقام فقط')
        .custom((value, { req }) => {
            if (value <= 0 || value > 99) {
                throw new Error(
                    'الخصم يجب انيجب ان لا يزيد عن 100% ولا يقل عن 0% '
                );
            } else return true;
        }),

    // Add Images & Features ---------------------------
];
