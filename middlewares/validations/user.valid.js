const { body } = require('express-validator');

const UserLoginChain = [
    body('email')
        .isEmail()
        .withMessage('البريد الالكتروني غير صالح')
        .not()
        .isEmpty()
        .withMessage('البريد الإلكتروني فارغ'),
    body('password').not().isEmpty().withMessage('ادخل البريد الإلكتروني'),
];

const UserSignupChain = [
    body('firstName').not().isEmpty().withMessage('الإسم الاول فارغ'),

    body('lastName').not().isEmpty().withMessage('الإسم الثاني فارغ'),

    body('email')
        .isEmail()
        .withMessage('البريد الالكتروني غير صالح')
        .not()
        .isEmpty()
        .withMessage('البريد الإلكتروني فارغ'),

    body('password')
        .isLength({ min: 5 })
        .withMessage('كلمة السر يجب ان تكون اكبر من 5 حروف')
        .not()
        .isEmpty()
        .withMessage('كلمة السر فارغة'),

    body('confirmPassword').custom((value, { req }) => {
        if (value === req.body.password && value) return true;
        else throw 'كلمة السر غير متطابقة';
    }),

    body('phone')
        .isLength({ min: 5 })
        .isNumeric()
        .withMessage('الهاتف غير صالح')
        .not()
        .isEmpty()
        .withMessage('حقل الهاتف فارغ'),
];

const UserUpdateChain = [
    body('firstName').not().isEmpty().withMessage('الإسم الاول فارغ'),

    body('lastName').not().isEmpty().withMessage('الإسم الثاني فارغ'),

    body('phone')
        .isLength({ min: 5 })
        .isNumeric()
        .withMessage('الهاتف غير صالح')
        .not()
        .isEmpty()
        .withMessage('حقل الهاتف فارغ'),
];

// ---------------------------------------
// ---------------------------------------

const AdminLoginChain = [
    body('firstName').not().isEmpty().withMessage('الإسم الاول فارغ'),

    body('lastName').not().isEmpty().withMessage('الإسم الثاني فارغ'),

    body('email')
        .isEmail()
        .withMessage('البريد الالكتروني غير صالح')
        .not()
        .isEmpty()
        .withMessage('البريد الإلكتروني فارغ'),

    body('password')
        .isLength({ min: 5 })
        .withMessage('كلمة السر يجب ان تكون اكبر من 5 حروف')
        .not()
        .isEmpty()
        .withMessage('كلمة السر فارغة'),

    body('confirmPassword').custom((value, { req }) => {
        if (value === req.body.password) return true;
        else throw 'كلمة السر غير متطابقة';
    }),

    body('phone')
        .isLength({ min: 5 })
        .isNumeric()
        .withMessage('الهاتف غير صالح')
        .not()
        .isEmpty()
        .withMessage('حقل الهاتف فارغ'),
];

// const AdminSignupChain = [
//     body('firstName').not().isEmpty().withMessage('الإسم الاول فارغ'),

//     body('lastName').not().isEmpty().withMessage('الإسم الثاني فارغ'),

//     body('email')
//         .isEmail()
//         .withMessage('البريد الالكتروني غير صالح')
//         .not()
//         .isEmpty()
//         .withMessage('البريد الإلكتروني فارغ'),

//     body('password')
//         .isLength({ min: 5 })
//         .withMessage('كلمة السر يجب ان تكون اكبر من 5 حروف')
//         .not()
//         .isEmpty()
//         .withMessage('كلمة السر فارغة'),

//     body('confirmPassword').custom((value, { req }) => {
//         if (value === req.body.password) return true;
//         else throw 'كلمة السر غير متطابقة';
//     }),

//     body('phone')
//         .isLength({ min: 5 })
//         .isNumeric()
//         .withMessage('الهاتف غير صالح')
//         .not()
//         .isEmpty()
//         .withMessage('حقل الهاتف فارغ'),
// ];

module.exports = {
    UserLoginChain,
    UserSignupChain,
    UserUpdateChain,

    AdminLoginChain,
    // AdminSignupChain,
};
