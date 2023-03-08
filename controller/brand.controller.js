const { Brand, Product, sequelize } = require('../models/index');
module.exports = class BrandsClass {
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ GET | جلب البيانات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ GET | جلب البيانات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ GET | جلب البيانات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async getAll() {
        try {
            const brands = await Brand.findAll();
            return brands;
        } catch (error) {
            throw new Error(
                err.message ||
                    'البيانات التي طلبتها غير موجودة. برجاء اعادة المحاولة'
            );
        }
    }
    async getOne() {
        try {
            const brands = await Brand.findAll();
            return brands;
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
    async create(newBrand) {
        try {
            const brand = await Brand.create(newBrand);
            return { brand };
        } catch (err) {
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ UPDATE | تعديل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ UPDATE | تعديل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ UPDATE | تعديل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async update(newBrand, brandId) {
        try {
            const brand = await Brand.update(newBrand, {
                where: { id: brandId },
            });
            return { brand };
        } catch (err) {
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }

    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ DELETE | حذف ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ DELETE | حذف ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ DELETE | حذف ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async delete(brandId) {
        const transaction = await sequelize.transaction();
        try {
            const haveProducts = await Product.findOne(
                {
                    where: { brandId },
                },
                { transaction }
            );
            if (haveProducts) {
                throw new Error(
                    'هناك سجلات منتجات مسجله بهذا التصنيف لا يمكنك الحذف الا بعد نقل او حذف جميع المنتجات الى تصنيف اخر'
                );
            }

            const brand = await Brand.destroy(
                {
                    where: { id: brandId },
                },
                { transaction }
            );
            await transaction.commit();

            return { brand };
        } catch (err) {
            await transaction.rollback();
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }
};
