const {
    Order,
    Product,
    order_product,
    coupon,
    used_coupon,
    sequelize,
} = require('../models/index');

module.exports = class OrdersClass {
    // ================================================================================================
    // ================================================================================================
    // ======================================== USER METHODS ==========================================
    // ======================================== USER METHODS ==========================================
    // ================================================================================================
    // ================================================================================================

    // ============================== GET | جلب البيانات ==============================
    // ============================== GET | جلب البيانات ==============================
    async getAll() {
        try {
            const orders = await Order.findAll({
                include: [
                    { model: Category, attributes: ['id', 'name'] },
                    { model: sub_category, attributes: ['id', 'name'] },
                    { model: order_images, attributes: ['image'], limit: 1 },
                    { model: Brand, attributes: ['name'] },
                ],
                attributes: [
                    'id',
                    'barcode',
                    'name',
                    'quantity',
                    'sell_price',
                    'discount',
                ],
            });
            return { orders };
        } catch (err) {
            throw new Error(
                err.message ||
                    'البيانات التي طلبتها غير موجودة. برجاء اعادة المحاولة'
            );
        }
    }
    async getOne(OrderId) {
        try {
            const order = await Order.findOne(
                { where: { id: OrderId } },
                {
                    include: [
                        {
                            model: features,
                            attributes: ['key', 'desc', 'name'],
                        },
                        { model: Category, attributes: ['id', 'name'] },
                        { model: sub_category, attributes: ['id', 'name'] },
                        { model: order_images, attributes: ['image'] },
                        { model: Brand, attributes: ['name'] },
                    ],
                    attributes: [
                        'id',
                        'barcode',
                        'name',
                        'quantity',
                        'sell_price',
                        'discount',
                    ],
                }
            );
            return { order };
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
            const orders = await Order.findAll({
                include: ['features', 'Category', 'sub_category', 'Brand'],
            });
            return { orders };
        } catch (err) {
            throw new Error(
                err.message ||
                    'البيانات التي طلبتها غير موجودة. برجاء اعادة المحاولة'
            );
        }
    }
    async getOne_admin(OrderId) {
        try {
            const order = await Order.findByPk(OrderId, {
                include: ['features', 'Category', 'sub_category', 'Brand'],
            });
            return { order };
        } catch (err) {
            throw new Error(
                err.message ||
                    'البيانات التي طلبتها غير موجودة. برجاء اعادة المحاولة'
            );
        }
    }

    // ============================== CREATE NEW | إنشاء جديد ==============================
    // ============================== CREATE NEW | إنشاء جديد ==============================
    async create(orderData, productsData, userId) {
        const transaction = await sequelize.transaction();

        const calcPercentage = (mainValue, isPercentage, value) => {
            return isPercentage
                ? mainValue - mainValue * (value / 100)
                : mainValue - value;
        };
        try {
            // ============================================================================
            // ================ Products LOGIC >>> QTY & Prices & Descount ================
            for (const prod of productsData) {
                // Find the product by its ID
                const product = await Product.findByPk(prod.productId, {
                    transaction,
                });
                // Check if the product has sufficient quantity
                if (product.quantity < prod.qty) {
                    throw new Error(
                        `الكمية المطلوبه للمنتج ${product.name} غير موجودة`
                    );
                }
                prod.price = product.sell_price;
                prod.pur_price = product.pur_price;
                prod.discount = product.discount;
                const netPrice = prod.price - prod.price * (discount / 100);
                prod.totalPrice = netPrice * prod.qty;

                // Decrement the product's quantity
                product.quantity -= prod.qty;
                // Save the product
                await product.save({ transaction });
            }

            // ================================================================
            // ========================= COUPON LOGIC =========================
            function couponOperate({
                couponType,
                productId,
                isPercentage,
                value,
            }) {
                if (couponType === 'product') {
                    let cpnProduct = productsData.find(
                        (prod) => prod.id === productId
                    );
                    cpnProduct.sell_price = calcPercentage(
                        cpnProduct.sell_price,
                        isPercentage,
                        value
                    );
                    productsData = [
                        ...productsData.filter((P) => P.id !== prod.id),
                        cpnProduct,
                    ];
                    
                }

                if (couponType === 'category') {
                }
            }
            let couponData;
            if (orderData.couponCode) {
                couponData = await coupon.findOne({
                    where: { code: orderData.couponCode },
                });
                if (!couponData || !couponData.isActive)
                    throw new Error('الكوبون غير صالح');
                const isUsedCoupon = await used_coupon.findOne({
                    where: { couponId: orderData.couponCode, userId },
                });
                if (isUsedCoupon) throw new Error('الكوبون مستخدم من قبل');
                if (!isUsedCoupon) {
                    await used_coupon.create({userId, couponId: orderData.id })
                };
                couponOperate(couponData);
            }

            // ==============================================================
            // ========================= ORDER DATA =========================
            const order = await Order.create(
                { ...orderData, userId, status: 'pending' },
                { transaction }
            );
    const products = await order_product.bulkCreate(
        productsData.map((prod) => {
            // if ( orderData.couponId && couponData?.couponType === 'product') {
            //     if(couponData.isPercentage){
            //         prod.sell_price = prod.sell_price - (prod.sell_price * (couponData.value / 100));
            //     }else{
            //         prod.sell_price = prod.sell_price - couponData.value;
            //     }
            // }
            const totalPrice = prod.quantity * prod.sell_price;
            return {
                productId: prod.productId,
                orderId: order.id,
                qty: prod.qty,
                price: prod.sell_price,
                totalPrice,
            };
        }),
        {
            transaction,
        }
    );
            await transaction.commit();

            return { order, products };
        } catch (err) {
            await transaction.rollback();
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }

    // ============================== FAIL ORDER | فشل الطلب ==============================
    // ============================== FAIL ORDER | فشل الطلب ==============================
    async failedOrder(orderId) {
        const transaction = await sequelize.transaction();
        try {
            const order = await order.findByPk(orderId, {
                include: [{ model: Product, as: 'prods' }],
                transaction,
            });

            // Check if status is 'success' or 'shipped'
            if (order.status === 'success' || order.status === 'shipped') {
                throw new Error(
                    'لا يمكن إلغاء هذا المنتج لانه تم شحنه بالفعل او تم ايصاله للعميل'
                );
            }
            // ADD Main details of Order
            await Order.update(
                { where: { id: orderId } },
                { status: 'failed' },
                { transaction }
            );

            for (const prod of order.prods) {
                // Find the product by its ID
                const product = await Product.findByPk(prod.productId, {
                    transaction,
                });

                // Check if the product has sufficient quantity
                if (product.quantity < prod.quantity) {
                    throw new Error(
                        `الكمية المطلوبه للمنتج ${product.name} غير موجودة`
                    );
                }

                // Decrement the product's quantity
                product.quantity += prod.quantity;

                // Save the product
                await product.save({ transaction });
            }

            await transaction.commit();

            return { order };
        } catch (err) {
            await transaction.rollback();
            throw new Error(
                err.message || 'حدث خطأ ولم تتم العملية برجاء إعادة المحاولة'
            );
        }
    }
};
