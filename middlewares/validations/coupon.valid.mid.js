const body = require('express-validator');

const CouponValid = [
    body('couponType')
        .not()
        .isEmpty()
        .withMessage('نوع بطاقة الخصم فارغة')
        .isIn(['product', 'category', 'order'])
        .withMessage('خطأ في نوع الخصم'),

    body('title').not().isEmpty().withMessage('العنوان فارغ'),

    body('desc').not().isEmpty().withMessage('الوصف فارغ'),

    body('isPercentage')
        .isBoolean()
        .withMessage('خطأ في وحدة الخصم')
        .not()
        .isEmpty()
        .withMessage('اختر وحدة الخصم مبلغ محدد ام نسبة'),

    // body('value').not().isEmpty().withMessage('قيمة الخصم فارغة'),
    body('value')
        .not()
        .isEmpty()
        .withMessage('قيمة الخصم فارغة')
        .custom((value, { req }) => {
            if (req.body.isPercentage) {
                if (value <= 0 || value > 99) {
                    throw new Error(
                        'في حالة اختيار وحدة الخصم "نسبة" يجب ان لا يزيد عن 100% ولا يقل عن 0%'
                    );
                }
            } else return true;
        }),
];
