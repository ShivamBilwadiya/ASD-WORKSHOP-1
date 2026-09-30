const fs = require("fs/promises");
const path = require("path");

const dbPath = path.join(__dirname, "..", "db.json");

async function readProducts() {
    const rawData = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(rawData);
}

async function writeProducts(productList) {
    await fs.writeFile(
        dbPath,
        JSON.stringify(productList, null, 2)
    );
}

module.exports = {
    readProducts,
    writeProducts
};