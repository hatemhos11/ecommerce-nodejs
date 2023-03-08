const body = require('express-validator');

const CompValid = [
    body('userId').isNumeric().withMessage('خطأ في بيانات المستخدم'),

    body('title').not().isEmpty().withMessage('العنوان فارغ'),
    body('desc').not().isEmpty().withMessage('الوصف فارغ'),
];
