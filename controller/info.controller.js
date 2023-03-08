const { Info } = require('../models/index');
module.exports = class InfosClass {
    // ============================= GET | جلب البيانات =============================
    // ============================= GET | جلب البيانات =============================
    async getOne() {
        try {
            const infos = await Info.findByPk(1);
            return { infos };
        } catch (error) {
            throw new Error(
                err.message ||
                    'البيانات التي طلبتها غير موجودة. برجاء اعادة المحاولة'
            );
        }
    }

    // ============================= UPDATE | تعديل =============================
    // ============================= UPDATE | تعديل =============================
    async update(newInfo) {
        try {
            const info = await Info.update(newInfo, {
                where: { id: 1 },
            });
            return { info };
        } catch (err) {
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }
};
