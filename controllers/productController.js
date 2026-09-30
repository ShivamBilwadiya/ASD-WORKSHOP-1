const productService = require("../services/productService");
const clearCache = require("../middleware/invalidateCache");

async function getProducts(req, res) {
    try {
        const productList =
            await productService.getAllProducts();

        res.json(productList);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function getProduct(req, res) {
    try {
        const singleProduct =
            await productService.getProductById(
                req.params.id
            );

        if (!singleProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(singleProduct);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function createProduct(req, res) {
    try {
        const createdProduct =
            await productService.createProduct(req.body);

        clearCache();

        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function updateProduct(req, res) {
    try {
        const updatedProduct =
            await productService.updateProduct(
                req.params.id,
                req.body
            );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        clearCache();

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const deletedProduct =
            await productService.deleteProduct(
                req.params.id
            );

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        clearCache();

        res.json({
            message: "Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};