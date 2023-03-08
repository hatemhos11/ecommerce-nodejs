const { Tag, Product, sequelize } = require('../models/index');
module.exports = class TagsClass {
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ GET | جلب البيانات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ GET | جلب البيانات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ GET | جلب البيانات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async getAll() {
        try {
            const tags = await Tag.findAll();
            return tags;
        } catch (error) {
            throw new Error(
                err.message ||
                    'البيانات التي طلبتها غير موجودة. برجاء اعادة المحاولة'
            );
        }
    }
    async getOne() {
        try {
            const tags = await Tag.findAll();
            return tags;
        } catch (error) {
            throw new Error(
                err.message ||
                    'البيانات التي طلبتها غير موجودة. برجاء اعادة المحاولة'
            );
        }
    }

    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ CREATE | إضافة ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ CREATE | إضافة ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ CREATE | إضافة ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async create(newTag) {
        try {
            const tag = await Tag.create(newTag);
            return { tag };
        } catch (err) {
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ UPDATE | تعديل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ UPDATE | تعديل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ UPDATE | تعديل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async update(newTag, tagId) {
        try {
            const tag = await Tag.update(newTag, {
                where: { id: tagId },
            });
            return { tag };
        } catch (err) {
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }

    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ DELETE | حذف ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ DELETE | حذف ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ DELETE | حذف ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async delete(tagId) {
        const transaction = await sequelize.transaction();
        try {
            const haveProducts = await Product.findOne(
                {
                    where: { tagId },
                },
                { transaction }
            );
            if (haveProducts) {
                throw new Error(
                    'هناك سجلات منتجات مسجله بهذا الوسم لا يمكنك الحذف الا بعد نقل او حذف جميع المنتجات الى وسم اخر'
                );
            }

            const tag = await Tag.destroy(
                {
                    where: { id: tagId },
                },
                { transaction }
            );
            await transaction.commit();

            return { tag };
        } catch (err) {
            await transaction.rollback();
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }
};
