const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const { SECRET_TOKEN } = require('../config/env');

module.exports = class UsersClass {
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ GET | جلب البيانات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ GET | جلب البيانات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async getAll() {
        try {
            const users = await User.findAll({
                offset: (page - 1) * num,
                limit: num,
            });
            return users;
        } catch (err) {
            throw new Error(
                err.message ||
                    'البيانات التي طلبتها غير موجودة. برجاء اعادة المحاولة'
            );
        }
    }
    async getOne(ID) {
        try {
            const user = await User.findByPk(ID);
            return { user };
        } catch (err) {
            throw new Error(
                err.message ||
                    'البيانات التي طلبتها غير موجودة. برجاء اعادة المحاولة'
            );
        }
    }
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ AUTHENTICATION | صلاحيات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ AUTHENTICATION | صلاحيات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ AUTHENTICATION | صلاحيات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async signUp(newUser) {
        try {
            const isUniqueEmail = await User.findOne({
                where: { email: newUser.email },
            });
            const isUniquePhone = await User.findOne({
                where: { phone: newUser.phone },
            });
            if (isUniqueEmail) {
                throw new Error(
                    'البريد الإلكتروني مسجل من قبل، هل تريد تسجيل الدخول'
                );
            }
            if (isUniquePhone) {
                throw new Error('الهاتف مسجل من قبل');
            }
            const user = await User.create(newUser, {
                fields: [
                    'firstName',
                    'lastName',
                    'fullName',
                    'email',
                    'password',
                    'phone',
                    'city',
                    'age',
                    'gender',
                ],
            });
            const token = jwt.sign(
                { id: user.id, expiresIn: '10d' },
                SECRET_TOKEN
            );
            user.dataValues.token = token;

            // 1- Generate Confirmation code (genCodeFn FUNCTION)
            // 2- Add Confirmation code to table && Add Date expirationCode to table
            // 3- Send Code To Email By Mailer Api

            delete user.dataValues.password;
            return { user };
        } catch (err) {
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }
    async activateEmail(code, email) {
        try {
            // -- CHECK VALIDATE CODE
            const Found = await User.findOne({
                where: { confirmationCode: code, email },
            });
            if (!Found) {
                throw new Error('الكود غير صحيح برجاء التأكد واعادة المحاولة');
            }

            // -- CHECK EXPIRY CODE
            // const ExpireDate = new Date(new Date(Found.expirationCode).getTime() + 60 * 60 * 24 * 1000)
            const ExpireDate = new Date(
                Found.expirationCode.getTime() + 60 * 60 * 24 * 1000
            );
            if (Found.expirationCode.getTime() > ExpireDate) {
                throw new Error(
                    'انتهت صلاحية هذا الكود برجاء ارسال كود اخر واعادة المحاولة'
                );
            }

            // ADD NEW STATUS TO USER
            Found.confirmationStatus = 'active';
            await Found.save();

            return {};
        } catch (err) {
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }
    async resendConfirmCode(email) {
        const Found = await User.findOne({
            where: { email },
        });
        if (!Found) {
            throw new Error('البريد الإلكتروني غير مسجل من قبل');
        }
        // 1- Generate Confirmation code (genCodeFn FUNCTION)
        // 2- Add Confirmation code to table && Add Date expirationCode to table
        // 3- Send Code To Email By Mailer Api
    }

    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ AUTHENTICATION | صلاحيات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ AUTHENTICATION | صلاحيات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ AUTHENTICATION | صلاحيات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async login(email, password) {
        const errMSG = 'هناك خطأ في إسم المستخدم أو كلمة السر';
        try {
            const user = await User.findOne(
                { where: { email } },
                {
                    attributes: {
                        exclude: [
                            'password',
                            'createdAt',
                            'updatedAt',
                            'confirmationStatus',
                        ],
                    },
                }
            );

            if (!user) {
                throw new Error(errMSG);
            }

            if (await bcrypt.compare(password, user.password)) {
                if (!user.isActive)
                    throw new Error(
                        'تم تعطيل حسابك حاليا يمكنك مراجعة البريد الإلكتروني او التواصل مع الدعم'
                    );
                const token = jwt.sign(
                    { id: user.id, expiresIn: '10d' },
                    SECRET_TOKEN
                );
                user.dataValues.token = token;
                delete user.dataValues.password;
                delete user.dataValues.confirmationCode;
                delete user.dataValues.expirationCode;
                return { user };
            } else {
                throw new Error(errMSG);
            }
        } catch (err) {
            throw new Error(err.message || errMSG);
        }
    }

    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ UPDATE | تعديل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ UPDATE | تعديل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ UPDATE | تعديل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async update(newUser, id) {
        try {
            const user = await User.update(newUser, {
                where: { id },
                fields: [
                    'firstName',
                    'lastName',
                    'email',
                    'phone',
                    'city',
                    'age',
                    'gender',
                ],
            });
            const editUser = await User.findByPk(id, {
                attributes: {
                    exclude: ['password'],
                },
            });
            return { user: editUser };
        } catch (err) {
            throw new Error(
                err.message || 'لم يتم التعديل برجاء إعادة المحاولة'
            );
        }
    }
    async changePassword(oldPassword, newPassword, userId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('خطأ في كلمة السر');
            }
            const isTrue = await bcrypt.compare(oldPassword, user.password);
            if (!isTrue) {
                throw new Error('كلمة السر غير متطابقة');
            }

            user.set({ password: newPassword });
            await user.save();
            return {};
        } catch (err) {
            throw new Error(err.message || 'خطأ في كلمة السر');
        }
    }

    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ IN-ACTIVE | تعديل التفعيل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ IN-ACTIVE | تعديل التفعيل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ IN-ACTIVE | تعديل التفعيل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async changeActivate(newActiveValue, userId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('المستخدم غير موجود');
            }

            // CHANGE ACTIVATE
            user.set({ isActive: newActiveValue });
            await user.save();
            return {};
        } catch (err) {
            throw new Error(err.message || 'خطأ');
        }
    }
};
