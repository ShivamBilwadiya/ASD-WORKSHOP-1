const { cache } = require("./cacheMiddleware");

function invalidateCache() {
    Object.keys(cache).forEach((cacheKey) => {
        delete cache[cacheKey];
    });

    console.log("Cache Cleared");
}

module.exports = invalidateCache;