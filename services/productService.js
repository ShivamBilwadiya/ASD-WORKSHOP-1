const productDB = require("../database/productDB");

async function delay() {
    return new Promise((done) => {
        setTimeout(done, 1500);
    });
}

async function getAllProducts() {
    await delay();
    return await productDB.readProducts();
}

async function getProductById(productId) {
    await delay();

    const items = await productDB.readProducts();

    return items.find(
        (item) => item.id === Number(productId)
    );
}

async function createProduct(newProduct) {
    const items = await productDB.readProducts();

    items.push(newProduct);

    await productDB.writeProducts(items);

    return newProduct;
}

async function updateProduct(productId, updatePayload) {
    const items = await productDB.readProducts();

    const targetIndex = items.findIndex(
        (item) => item.id === Number(productId)
    );

    if (targetIndex === -1) return null;

    items[targetIndex] = {
        ...items[targetIndex],
        ...updatePayload
    };

    await productDB.writeProducts(items);

    return items[targetIndex];
}

async function deleteProduct(productId) {
    const items = await productDB.readProducts();

    const targetIndex = items.findIndex(
        (item) => item.id === Number(productId)
    );

    if (targetIndex === -1) return null;

    const removedItem = items[targetIndex];

    items.splice(targetIndex, 1);

    await productDB.writeProducts(items);

    return removedItem;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};