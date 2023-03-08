const { Coupon, Product, sequelize } = require('../models/index');
module.exports = class CouponsClass {
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ GET | جلب البيانات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ GET | جلب البيانات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ GET | جلب البيانات ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async getAll() {
        try {
            const coupons = await Coupon.findAll();
            return coupons;
        } catch (error) {
            throw new Error(
                err.message ||
                    'البيانات التي طلبتها غير موجودة. برجاء اعادة المحاولة'
            );
        }
    }
    async getOne() {
        try {
            const coupons = await Coupon.findAll();
            return coupons;
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
    async create(newCoupon) {
        try {
            const coupon = await Coupon.create(newCoupon);
            return { coupon };
        } catch (err) {
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ UPDATE | تعديل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ UPDATE | تعديل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ UPDATE | تعديل ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async update(newCoupon, couponId) {
        try {
            const coupon = await Coupon.update(newCoupon, {
                where: { id: couponId },
            });
            return { coupon };
        } catch (err) {
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }

    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ DELETE | حذف ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ DELETE | حذف ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ DELETE | حذف ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    async delete(couponId) {
        const transaction = await sequelize.transaction();
        try {
            const haveProducts = await Product.findOne(
                {
                    where: { couponId },
                },
                { transaction }
            );
            if (haveProducts) {
                throw new Error(
                    'هناك سجلات منتجات مسجله بهذا التصنيف لا يمكنك الحذف الا بعد نقل او حذف جميع المنتجات الى تصنيف اخر'
                );
            }

            const coupon = await Coupon.destroy(
                {
                    where: { id: couponId },
                },
                { transaction }
            );
            await transaction.commit();

            return { coupon };
        } catch (err) {
            await transaction.rollback();
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }
};
