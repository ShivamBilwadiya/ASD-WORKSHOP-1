# Product Management API & In-Memory Caching System

A modular RESTful API built with **Node.js** and **Express.js** featuring custom in-memory caching middleware with TTL expiration, automated cache invalidation, and a file-based JSON persistence layer.

---

## 🚀 Features

- **Layered Architecture**: Structured separation of concerns across routes, controllers, services, and database layers.
- **In-Memory Caching Middleware**:
  - Automatically caches responses for `GET` requests.
  - Returns `X-Cache: HIT` for cached responses and `X-Cache: MISS` for fresh data.
  - Configurable TTL (Time-To-Live) expiration (60 seconds).
- **Automated Cache Invalidation**: Automatically purges stale cache on mutations (`POST`, `PUT`, `PATCH`, `DELETE`).
- **File-Based Database**: Async file system storage (`fs/promises`) backing `db.json`.
- **Simulated Latency**: Built-in latency simulation in the service layer to demonstrate caching performance gains.

---

## 📁 Project Structure

```text
ASD-WORKSHOP-1/
├── controllers/
│   └── productController.js   # Request handling and HTTP responses
├── database/
│   └── productDB.js          # File I/O operations for db.json
├── middleware/
│   ├── cacheMiddleware.js    # In-memory caching logic & headers
│   └── invalidateCache.js    # Cache flush utility
├── routes/
│   └── productRoutes.js      # Express router definitions
├── services/
│   └── productService.js     # Business logic & latency simulation
├── db.json                   # JSON database storage
├── package.json              # Dependencies and scripts
├── server.js                 # Application entry point
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ShivamBilwadiya/ASD-WORKSHOP-1.git
   cd ASD-WORKSHOP-1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server (with Nodemon):
   ```bash
   npm run server
   ```

The server will start listening at `http://localhost:3000`.

---

## 📡 API Endpoints

| Method | Endpoint | Description | Cache Behavior |
| :--- | :--- | :--- | :--- |
| `GET` | `/products` | Retrieve all products | **Cached** (`X-Cache: HIT/MISS`) |
| `GET` | `/products/:id` | Retrieve product by ID | **Cached** (`X-Cache: HIT/MISS`) |
| `POST` | `/products` | Create a new product | **Invalidates Cache** |
| `PUT` | `/products/:id` | Replace / update product | **Invalidates Cache** |
| `PATCH`| `/products/:id` | Partially update product | **Invalidates Cache** |
| `DELETE`| `/products/:id` | Delete a product | **Invalidates Cache** |

---

## 🧪 Example Requests

### 1. Fetch All Products
```bash
curl -i http://localhost:3000/products
```
*First request returns `X-Cache: MISS` (~1.5s). Subsequent requests within 60s return `X-Cache: HIT` (instant).*

### 2. Create a Product
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"id": 6, "name": "Headphones", "price": 79.99}'
```

### 3. Update a Product
```bash
curl -X PUT http://localhost:3000/products/6 \
  -H "Content-Type: application/json" \
  -d '{"name": "Wireless Headphones", "price": 89.99}'
```

### 4. Delete a Product
```bash
curl -X DELETE http://localhost:3000/products/6
```
