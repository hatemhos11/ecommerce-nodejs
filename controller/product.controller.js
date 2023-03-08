const {
    Product,
    features,
    product_rate,
    Category,
    sub_category,
    product_images,
    Brand,
    sequelize,
} = require('../models/index');
const path = require('path');
const fs = require('fs');
const {
    search,
    prod_search,
    name_search,
} = require('./handlers/products/product.handler');

module.exports = class ProductsClass {
    // ================================================================================================
    // ================================================================================================
    // ======================================== USER METHODS ==========================================
    // ======================================== USER METHODS ==========================================
    // ================================================================================================
    // ================================================================================================

    // ============================== GET | جلب البيانات ==============================
    // ============================== GET | جلب البيانات ==============================

    async getAll(page, queries) {
        try {
            const products = await Product.findAll({
                include: [
                    {
                        model: Category,
                        attributes: ['id', 'name'],
                        where: name_search(queries?.category),
                    },
                    { model: sub_category, attributes: ['id', 'name'] },
                    { model: product_images, attributes: ['image'], limit: 1 },
                    { model: Brand, attributes: ['name'] },
                ],
                where: prod_search(queries),
                attributes: [
                    'id',
                    'barcode',
                    'name',
                    'quantity',
                    'sell_price',
                    'rate',
                    'discount',
                ],
                // where: ,
                limit: queries.limit || 20,
            });
            return { products };
        } catch (err) {
            throw new Error(
                err.message ||
                    'البيانات التي طلبتها غير موجودة. برجاء اعادة المحاولة'
            );
        }
    }
    async getOne(ProductId) {
        try {
            const product = await Product.findOne({
                where: { id: ProductId },
                include: [
                    {
                        model: product_images,
                        attributes: ['image'],
                    },
                    {
                        model: features,
                        attributes: ['key', 'desc', 'name'],
                    },
                    { model: Category, attributes: ['id', 'name'] },
                    { model: sub_category, attributes: ['id', 'name'] },
                    { model: Brand, attributes: ['name'] },
                    {
                        model: product_rate,
                        attributes: ['productId', 'comment'],
                    },
                ],
                attributes: [
                    'id',
                    'barcode',
                    'name',
                    'rate',
                    'quantity',
                    'sell_price',
                    'discount',
                ],
            });
            return { product };
        } catch (err) {
            throw new Error(
                err.message ||
                    'البيانات التي طلبتها غير موجودة. برجاء اعادة المحاولة'
            );
        }
    }

    async getHome() {
        try {
            const products = await Product.findAll({
                include: [
                    {
                        model: Category,
                        attributes: ['id', 'name'],
                        where: name_search(queries?.category),
                    },
                    { model: sub_category, attributes: ['id', 'name'] },
                    {
                        model: product_images,
                        attributes: ['image'],
                        limit: 1,
                    },
                    { model: Brand, attributes: ['name'] },
                ],
                where: {},
                attributes: [
                    'id',
                    'barcode',
                    'name',
                    'quantity',
                    'sell_price',
                    'discount',
                ],
                // where: ,
                limit: queries.limit || 20,
            });
            return { products };
        } catch (err) {
            throw new Error(
                err.message ||
                    'البيانات التي طلبتها غير موجودة. برجاء اعادة المحاولة'
            );
        }
    }

    // ================================================================================================
    // ================================================================================================
    // ======================================== ADMIN METHODS =========================================
    // ======================================== ADMIN METHODS =========================================
    // ================================================================================================
    // ================================================================================================

    // ============================== GET | جلب البيانات ==============================
    // ============================== GET | جلب البيانات ==============================
    async getAll_admin() {
        try {
            const products = await Product.findAll({
                include: [
                    'features',
                    'Category',
                    'sub_category',
                    'Brand',
                    'product_image',
                ],
            });
            return { products };
        } catch (err) {
            throw new Error(
                err.message ||
                    'البيانات التي طلبتها غير موجودة. برجاء اعادة المحاولة'
            );
        }
    }
    async getOne_admin(ProductId) {
        try {
            const product = await Product.findByPk(ProductId, {
                include: [
                    'features',
                    'Category',
                    'sub_category',
                    'Brand',
                    'product_image',
                ],
            });
            return { product };
        } catch (err) {
            throw new Error(
                err.message ||
                    'البيانات التي طلبتها غير موجودة. برجاء اعادة المحاولة'
            );
        }
    }

    // ============================== CREATE NEW | إنشاء جديد ==============================
    // ============================== CREATE NEW | إنشاء جديد ==============================
    async rateProduct(rateData, productId, userId) {
        try {
            const isFound = await product_rate.findOne({
                where: { userId, productId },
            });
            if (isFound) {
                throw new Error('يوجد تقييم سابق لك على هذا المنتج');
            }
            const totalData = await product_rate.findAll({
                where: { productId },
                attributes: [
                    [
                        sequelize.fn('sum', sequelize.col('rate')),
                        'rates',
                        sequelize.fn('COUNT', sequelize.col('id')),
                        'count',
                    ],
                ],
            });
            const avg_rate = totalData.rates / totalData.count;
            const prod = await Product.findByPk(productId);
            prod.rate = avg_rate;
            await prod.save();

            const rate = await product_rate.create({
                ...rateData,
                productId,
                userId,
            });
            return { rate };
        } catch (err) {
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }
    // ============================== DEL RATE | حذف تقييم ==============================
    // ============================== DEL RATE | حذف تقييم ==============================
    async DelProduct_rate(productId, userId) {
        try {
            const isFound = await product_rate.findOne({
                where: { userId, productId },
            });

            if (!isFound) {
                throw new Error('يوجد تقييم سابق لك على هذا المنتج');
            }
            await product_rate.destroy({
                where: { id: isFound.id },
            });
            return { rate };
        } catch (err) {
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }

    // ============================== CREATE NEW | إنشاء جديد ==============================
    // ============================== CREATE NEW | إنشاء جديد ==============================
    async create(productData, newFeatures, newImages) {
        const transaction = await sequelize.transaction();

        try {
            // Check if ( sub-category ) is valid with his parent (Category)
            // isCatValidateSub( subCategoryId, categoryId )
            if (productData?.subCategoryId) {
                const subCat = await sub_category.findByPk(
                    productData.subCategoryId
                );
                const isValidSubCat =
                    (await subCat.baseCatId) == productData.categoryId;
                if (!isValidSubCat) {
                    throw new Error(
                        'التصنيف الفرعي غير متوافق مع التصنيف الرئيسي'
                    );
                }
            }
            // ADD Main details of Product
            const product = await Product.create(
                { ...productData },
                { transaction }
            );

            // ADD Features of Product
            const featuresMap = newFeatures?.map((feature) => feature);
            const FEATRUES = await features?.bulkCreate(featuresMap, {
                transaction,
            });
            await product.addFeatures(FEATRUES, { transaction });

            // ADD Images of Product
            const staticImagesDir = path.join(
                'server',
                'images',
                'products_images'
            );

            const IMAGES = newImages.map((IMG) => {
                const filename = `${UUIDV4()}-product${path.extname(
                    IMG.originalname
                )}`;
                const imagePath = path.join(staticImagesDir, filename);
                if (!fs.existsSync(staticImagesDir)) {
                    fs.mkdirSync(staticImagesDir);
                    fs.writeFile(imagePath, IMG.buffer, (err) => {
                        if (err) {
                            console.log(err.message);
                        }
                    });
                } else {
                    fs.writeFile(imagePath, IMG.buffer, (err) => {
                        if (err) {
                            console.log(err.message);
                        }
                    });
                }

                return { image: filename };
            });
            await product.addProduct_images(IMAGES, { transaction });

            await transaction.commit();
            return { product };
        } catch (err) {
            await transaction.rollback();
            throw new Error(
                err.stack || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }

    // ============================== ADD QTY | إضافة كمية ==============================
    // ============================== ADD QTY | إضافة كمية ==============================
    async incQTY(productId, QTY, pur_price, isSamePrice) {
        const transaction = await sequelize.transaction();
        try {
            // New Price
            const product = await Product.findByPk(productId);
            if (!product) {
                throw new Error('هذا المنتج غير موجود');
            }
            const newPrice =
                (pur_price + product.pur_price) / (product.quantity + QTY);

            await Product.update(
                {
                    pur_price: isSamePrice ? product.pur_price : newPrice,
                    quantity: product + QTY,
                },
                'quantity',
                { where: { id: productId }, transaction }
            );

            await transaction.commit();
            return { product };
        } catch (err) {
            await transaction.rollback();
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }

    // ============================== UPDATE | تعديل ==============================
    // ============================== UPDATE | تعديل ==============================
    async update(productId, productData, newFeatures) {
        const transaction = await sequelize.transaction();

        try {
            // Update SubCategoryId
            if (productData.subCategoryId && productData.categoryId) {
                const subCat = await sub_category.findByPk(
                    productData.subCategoryId
                );
                const isValidSubCat =
                    (await subCat.baseCatId) == productData.categoryId;
                if (!isValidSubCat) {
                    throw new Error(
                        'التصنيف الفرعي غير متوافق مع التصنيف الرئيسي'
                    );
                }
            }

            // Update Features
            if (newFeatures) {
                const updatedFeatures = newFeatures.map((feature) => ({
                    productId: product.id,
                    ...feature,
                }));
                updatedFeatures.forEach(async (feature) => {
                    await features.update(
                        feature,
                        { where: { productId } },
                        { transaction }
                    );
                });
            }

            // Update Product's Details
            const product = await Product.update(productData, {
                where: { id: productId },
            });

            await transaction.commit();
            return { product };
        } catch (err) {
            await transaction.rollback();
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }

    async update_img(imgID, oldFilename) {
        const transaction = await sequelize.transaction();
        try {
            const staticImagesDir = path.join(
                'server',
                'images',
                'products_images'
            );
            const filename = `${uuidv4()}-product${path.extname(
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

            const updated = await product_images.update(
                {
                    image: filename,
                },
                { where: { id: imgID } },
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
            return { filename };
        } catch (err) {
            throw new Error(err.message || 'خطأ');
        }
    }
    // ============================== DELETE | حذف ==============================
    // ============================== DELETE | حذف ==============================
    async delete(productId) {
        const transaction = await sequelize.transaction();
        try {
            // const haveOrders = await Order.findOne(
            //     {
            //         where: { productId },
            //     },
            //     { transaction }
            // );
            // if (haveOrders) {
            //     throw new Error(
            //         'المنتج موجود في سجلات الطلبات لا يمكنك حذفه'
            //     );
            // }

            const product = await Product.destroy(
                {
                    where: { id: productId },
                    cascade: true,
                },
                { transaction }
            );
            await transaction.commit();

            return { product };
        } catch (err) {
            await transaction.rollback();
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }
};
