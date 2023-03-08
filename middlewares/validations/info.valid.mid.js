const body = require('express-validator');

const InfoValid = [
    body('vatNum').not().isEmpty().withMessage('حقل الرقم الضريبي فارغ'),
    body('companyName').not().isEmpty().withMessage('حقل اسم الشركة فارغ'),
    body('هاتف الشركة').not().isEmpty().withMessage('حقل هاتف الشركة فارغ'),
];
