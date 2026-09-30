const express = require("express");

const productRouter = express.Router();

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const {
    cacheMiddleware
} = require("../middleware/cacheMiddleware");

productRouter.get(
    "/products",
    cacheMiddleware,
    getProducts
);

productRouter.get(
    "/products/:id",
    cacheMiddleware,
    getProduct
);

productRouter.post(
    "/products",
    createProduct
);

productRouter.put(
    "/products/:id",
    updateProduct
);

productRouter.patch(
    "/products/:id",
    updateProduct
);

productRouter.delete(
    "/products/:id",
    deleteProduct
);

module.exports = productRouter;