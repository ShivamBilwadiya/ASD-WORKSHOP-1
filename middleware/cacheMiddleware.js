const cacheStore = {};

const CACHE_DURATION = 60 * 1000;

function cacheMiddleware(req, res, next) {
    const cacheKey = req.originalUrl;

    const cachedItem = cacheStore[cacheKey];

    if (cachedItem) {
        const entryAge = Date.now() - cachedItem.createdAt;

        if (entryAge < CACHE_DURATION) {
            res.set("X-Cache", "HIT");

            return res.json(cachedItem.data);
        }

        delete cacheStore[cacheKey];
    }

    const nativeJson = res.json.bind(res);

    res.json = (payload) => {
        cacheStore[cacheKey] = {
            data: payload,
            createdAt: Date.now()
        };

        res.set("X-Cache", "MISS");

        return nativeJson(payload);
    };

    next();
}

module.exports = {
    cacheMiddleware,
    cache: cacheStore
};