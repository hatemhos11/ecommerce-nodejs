const { Op } = require('sequelize');
const { Admin } = require('../models/index');
module.exports = class AdminsClass {
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ GET | جلب البيانات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ GET | جلب البيانات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ GET | جلب البيانات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async getAll() {
        try {
            const admins = await Admin.findAll({
                offset: (page - 1) * num,
                limit: num,
            });
            return admins;
        } catch (error) {
            throw new Error(
                err.message ||
                    'البيانات التي طلبتها غير موجودة. برجاء اعادة المحاولة'
            );
        }
    }
    async getOne() {
        try {
            const admin = await Admin.findAll({
                offset: (page - 1) * num,
                limit: num,
            });
            return admin;
        } catch (error) {
            throw new Error(
                err.message ||
                    'البيانات التي طلبتها غير موجودة. برجاء اعادة المحاولة'
            );
        }
    }
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ AUTHENTICATION | صلاحيات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ AUTHENTICATION | صلاحيات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ AUTHENTICATION | صلاحيات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async signUp(newAdmin) {
        try {
            const isUnique = await Admin.findOne({
                where: { email: newAdmin.email },
            });
            if (isUnique) {
                throw new Error('البريد الإلكتروني مسجل من قبل');
            }
            const admin = await Admin.create(newAdmin, {
                fields: [
                    'firstName',
                    'lastName',
                    'username',
                    'email',
                    'password',
                    'phone',
                ],
            });
            return { admin };
        } catch (err) {
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }

    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ AUTHENTICATION | صلاحيات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ AUTHENTICATION | صلاحيات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ AUTHENTICATION | صلاحيات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async login(email, password) {
        const errMSG = 'هناك خطأ في إسم المستخدم أو كلمة السر';
        try {
            const admin = await Admin.findOne(
                { where: { [Op.or]: { email, username: email } } },
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

            if (!admin) {
                throw new Error(err.message || errMSG);
            }

            if (await bcrypt.compare(password, admin.password)) {
                const token = jwt.sign({ id: admin.id }, { expiresIn: '7d' });
                admin.dataValues.token = token;
                return { admin, roles };
            } else {
                throw new Error(err.message || errMSG);
            }
        } catch (err) {
            throw new Error(err.message || errMSG);
        }
    }

    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ UPDATE | تعديل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ UPDATE | تعديل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ UPDATE | تعديل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async update(newAdmin, id) {
        try {
            const admin = await Admin.update(
                newAdmin,
                { where: { id } },
                {
                    fields: [
                        'firstName',
                        'lastName',
                        'fullName',
                        'email',
                        'phone',
                        'city',
                        'age',
                        'gender',
                    ],
                }
            );
            return admin;
        } catch (err) {
            new Error(err.message || 'لم يتم التعديل برجاء إعادة المحاولة');
        }
    }
    async changePassword(oldPassword, newPassword, adminId) {
        const admin = await Admin.findByPk(adminId);
        if (!admin && admin.password !== oldPassword) {
            throw new Error('خطأ في كلمة السر');
        }

        // CHANGE PASSWORD
        admin.save({
            password: newPassword,
        });
        // await Admin.update(
        //     { id: adminId },
        //     {
        //         password: newPassword,
        //     }
        // );
        await admin.save();
        return { admin };
    }

    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ IN-ACTIVE | تعديل التفعيل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ IN-ACTIVE | تعديل التفعيل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ IN-ACTIVE | تعديل التفعيل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async changeActivate(newActiveValue, id, adminId) {
        if (parseInt(adminId) !== 1) {
            throw new Error('غير مصرح لك بإلغاء التفعيل');
        }
        const admin = await Admin.findByPk(id);
        if (!admin) {
            throw new Error('المستخدم غير موجود');
        }

        // SET NEW ACTIVATE VALUE
        admin.set({ isActive: newActiveValue });

        await admin.save();

        return { admin };
    }
};
