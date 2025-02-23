# Product Management API

This API provides endpoints for managing products in a database. It supports operations such as creating, reading, updating, and deleting products, as well as bulk operations, searching, and stock management.

## Base URL

All endpoints are relative to the base URL:
https://localhost:3000/api/products


## Endpoints

### 1. Get All Products

Retrieves a list of all products.

- **URL:** `/`
- **Method:** `GET`
- **Response:** 
  - Status Code: 200 OK
  - Body: Array of product objects

**Example Request:**
GET /api/products/


### 2. Get a Single Product by ID

Retrieves a single product by its ID.

- **URL:** `/:id`
- **Method:** `GET`
- **Parameters:** 
  - `id` (string, required): The ID of the product
- **Response:** 
  - Status Code: 200 OK if found, 404 Not Found if not found
  - Body: Product object

**Example Request:**
GET /api/products/64f1b2c3e4b0a1b2c3d4e5f6


### 3. Create a New Product

Creates a new product.

- **URL:** `/`
- **Method:** `POST`
- **Request Body:**
  - `name` (string, required): Name of the product
  - `price` (number, required): Price of the product
  - `quantity` (number, optional): Quantity in stock (default: 0)
- **Response:** 
  - Status Code: 201 Created
  - Body: Created product object

**Example Request:**
POST /api/products/
Content-Type: application/json
{
"name": "New Product",
"price": 39.99,
"quantity": 200
}


### 4. Update a Product

Updates an existing product by ID.

- **URL:** `/:id`
- **Method:** `PUT`
- **Parameters:**
  - `id` (string, required): The ID of the product to update
- **Request Body:**
  - `name` (string, optional): Updated name
  - `price` (number, optional): Updated price
  - `quantity` (number, optional): Updated quantity
- **Response:**
  - Status Code: 200 OK if updated, 404 Not Found if not found
  - Body: Updated product object

**Example Request:**
PUT /api/products/64f1b2c3e4b0a1b2c3d4e5f6
Content-Type: application/json
{
"price": 49.99
}


### 5. Delete a Product

Deletes a product by ID.

- **URL:** `/:id`
- **Method:** `DELETE`
- **Parameters:**
  - `id` (string, required): The ID of the product to delete
- **Response:**
  - Status Code: 200 OK if deleted, 404 Not Found if not found
  - Body: Success message

**Example Request:**
DELETE /api/products/64f1b2c3e4b0a1b2c3d4e5f6
text


### 6. Bulk Delete Products

Deletes multiple products by their IDs.

- **URL:** `/bulk-delete`
- **Method:** `POST`
- **Request Body:**
  - `ids` (array of strings, required): Array of product IDs to delete
- **Response:**
  - Status Code: 200 OK if deleted, 400 Bad Request if no IDs provided, 404 Not Found if no products found
  - Body: Success message with the count of deleted products

**Example Request:**
POST /api/products/bulk-delete
Content-Type: application/json
{
"ids": ["64f1b2c3e4b0a1b2c3d4e5f6", "64f1b2c3e4b0a1b2c3d4e5f7"]
}



### 7. Search and Filter Products

Searches and filters products by name and price range.

- **URL:** `/search`
- **Method:** `GET`
- **Query Parameters:**
  - `name` (string, optional): Product name to search for (case-insensitive)
  - `minPrice` (number, optional): Minimum price filter
  - `maxPrice` (number, optional): Maximum price filter
- **Response:**
  - Status Code: 200 OK
  - Body: Array of filtered product objects

**Example Request:**
GET /api/products/search?name=Product&minPrice=10&maxPrice=50


### 8. Bulk Insert Products

Inserts multiple products at once.

- **URL:** `/bulk-insert`
- **Method:** `POST`
- **Request Body:** Array of product objects
- **Response:**
  - Status Code: 201 Created
  - Body: Array of created product objects

**Example Request:**
POST /api/products/bulk-insert
Content-Type: application/json
[
{
"name": "Product A",
"price": 10.99,
"quantity": 50
},
{
"name": "Product B",
"price": 20.99,
"quantity": 30
}
]


### 9. Get Total Count of Products

Retrieves the total count of products in the database.

- **URL:** `/count`
- **Method:** `GET`
- **Response:**
  - Status Code: 200 OK
  - Body: Object with the total count of products

**Example Request:**
GET /api/products/count



### 10. Reduce Stock Quantity

Reduces the stock quantity of a product after a purchase.

- **URL:** `/:id/reduce-stock`
- **Method:** `POST`
- **Parameters:**
  - `id` (string, required): The ID of the product
- **Request Body:**
  - `quantity` (number, required): The quantity to reduce
- **Response:**
  - Status Code: 200 OK if successful, 404 Not Found if product not found, 400 Bad Request if insufficient stock
  - Body: Updated product object

**Example Request:**
POST /api/products/64f1b2c3e4b0a1b2c3d4e5f6/reduce-stock
Content-Type: application/json
{
"quantity": 5
}



## Error Responses

All endpoints return a 500 Internal Server Error with a message if an unexpected error occurs:

mongodb+srv://soumyojyotisaha2021:Soumyo@2001@cluster0.7g7yo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
