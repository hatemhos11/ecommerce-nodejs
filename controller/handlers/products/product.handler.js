const { Op } = require('sequelize');

function prod_search(queries) {
    const searchRows = [];

    queries?.barcode && searchRows.push({ barcode: queries?.barcode });
    queries?.code && searchRows.push({ code: queries?.code });
    queries?.name &&
        searchRows.push({ name: { [Op.like]: `%${queries?.name}%` } });
    queries?.desc &&
        searchRows.push({ desc: { [Op.like]: `%${queries?.desc}%` } });
    queries?.rate && searchRows.push({ rate: { [Op.gte]: queries?.rate } });
    queries?.discount &&
        searchRows.push({ discount: { [Op.gte]: `%${queries?.discount}%` } });
    queries?.prices &&
        searchRows.push({
            sell_price: {
                [Op.between]: [queries?.prices[0], queries?.prices[1]],
            },
        });

    // queries?.brand && searchRows.push({ brand: { [Op.startsWith]: queries?.brand } });

    return searchRows.length ? { [Op.and]: searchRows } : {};
}
function name_search(name) {
    const searchRows = [];

    name && searchRows.push({ name: { [Op.like]: `%${name}%` } });
    return searchRows.length ? { [Op.and]: searchRows } : {};
}

module.exports = {
    prod_search,
    name_search,
};
