const body = require('express-validator');

const categoryValid = [
    body('name').not().isEmpty().withMessage('اسم التصنيف فارغ'),
];
// /[a-zA-Z0-9_]+/g
const subCatValid = [
    body('name').not().isEmpty().withMessage('اسم التصنيف فارغ'),
    body('baseCatId')
        .isEmpty()
        .withMessage('اسم التصنيف الرئيسي فارغ')
        .isNumeric(),
];
