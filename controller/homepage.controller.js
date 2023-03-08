const { Product, Option, sequelize } = require('../models/index');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

module.exports = class ProductsClass {
    // ============================== GET | جلب البيانات ==============================
    // ============================== GET | جلب البيانات ==============================
    async getSlides() {
        try {
            const slides = await Option.findOne({
                where: { id: 1 },
                attributes: ['slide1', 'slide2', 'slide3'],
            });
            return slides;
        } catch (err) {
            throw new Error(
                err.message ||
                    'البيانات التي طلبتها غير موجودة. برجاء اعادة المحاولة'
            );
        }
    }
    async getCats() {
        try {
            const categories = await Option.findOne({
                where: { id: 1 },
                attributes: ['cat1', 'cat2', 'cat3', 'cat4', 'cat5'],
                include: ['Category'],
            });
            return categories;
        } catch (err) {
            throw new Error(
                err.message ||
                    'البيانات التي طلبتها غير موجودة. برجاء اعادة المحاولة'
            );
        }
    }
    // ============================== GET | جلب البيانات ==============================
    // ============================== GET | جلب البيانات ==============================
    async productsStats() {
        const transaction = await sequelize.transaction();
        try {
            await transaction.commit();
            return { bestSeller, highestRated };
        } catch (err) {
            await transaction.rollback();
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }

    // ============================== CREATE NEW | إنشاء جديد ==============================
    // ============================== CREATE NEW | إنشاء جديد ==============================
    async updateSlide(id, file, oldFilename = 'not-file') {
        const transaction = await sequelize.transaction();
        try {
            if (!id || !file || (id != 1 && id != 2 && id != 3)) {
                throw new Error('اسم الملف غير موجود');
            }
            const staticImagesDir = path.join('server', 'images', 'static_images');
            const filename = `${uuidv4()}-slide${id}${path.extname(
                file.originalname
            )}`;
            const imagePath = path.join(staticImagesDir, filename);

            if (!fs.existsSync(staticImagesDir)) {
                fs.mkdirSync(staticImagesDir);
                fs.writeFile(imagePath, file.buffer, (err) => {
                    if (err) {
                        console.log(err.message);
                    }
                });
            } else {
                fs.writeFile(imagePath, file.buffer, (err) => {
                    if (err) {
                        console.log(err.message);
                    }
                });
            }

            const updated = await Option.update(
                {
                    [`slide${id}`]: filename,
                },
                { where: { id: 1 } },
                {
                    transaction,
                }
            );
            if (updated) {
                const oldPath = path.join(staticImagesDir, oldFilename);
                fs.access(oldPath, fs.constants.F_OK, (err) => {
                    if (!err) {
                        fs.unlink(oldPath, (err) => {
                            if (err) {
                                console.error(`غير قادر على الحذف حاليا`);
                            } else {
                                console.log('تم حذف الصوره القديمة بنجاح');
                            }
                        });
                    } else {
                        console.error('File does not exist');
                    }
                });
            }

            await transaction.commit();
            return { filename };
        } catch (err) {
            await transaction.rollback();
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }
};
