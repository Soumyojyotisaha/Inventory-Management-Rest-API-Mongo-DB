# Inventory Management API

This API provides endpoints for managing products in a database. It supports operations such as creating, reading, updating, and deleting products, as well as bulk operations, searching, and stock management.

## Base URL

All endpoints are relative to the base URL:
https://localhost:3000/api/products


## Endpoints
Customers
1. Get All Customers (Supplier Only)
Endpoint: GET /customers

Description: Retrieve a list of all customers. Only accessible by authenticated suppliers.

Authentication: Supplier token required.

Request:

http
Copy
GET /customers HTTP/1.1
Host: api.yourdomain.com
Authorization: Bearer YOUR_SUPPLIER_TOKEN
Response:

json
Copy
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane.smith@example.com"
    }
  ]
}
2. Register a Customer
Endpoint: POST /customers/register

Description: Register a new customer.

Authentication: None.

Request:

http
Copy
POST /customers/register HTTP/1.1
Host: api.yourdomain.com
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
Response:

json
Copy
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
3. Login a Customer
Endpoint: POST /customers/login

Description: Authenticate a customer and return a token.

Authentication: None.

Request:

http
Copy
POST /customers/login HTTP/1.1
Host: api.yourdomain.com
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
Response:

json
Copy
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
4. Get Customer Profile
Endpoint: GET /customers/profile

Description: Retrieve the profile of the authenticated customer.

Authentication: Customer token required.

Request:

http
Copy
GET /customers/profile HTTP/1.1
Host: api.yourdomain.com
Authorization: Bearer YOUR_CUSTOMER_TOKEN
Response:

json
Copy
{
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
5. Update Customer Profile
Endpoint: PUT /customers/profile

Description: Update the profile of the authenticated customer.

Authentication: Customer token required.

Request:

http
Copy
PUT /customers/profile HTTP/1.1
Host: api.yourdomain.com
Authorization: Bearer YOUR_CUSTOMER_TOKEN
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
Response:

json
Copy
{
  "data": {
    "id": 1,
    "name": "John Updated",
    "email": "john.updated@example.com"
  }
}
Orders
1. Place an Order (Customer Only)
Endpoint: POST /orders

Description: Place a new order. Only accessible by authenticated customers.

Authentication: Customer token required.

Request:

http
Copy
POST /orders HTTP/1.1
Host: api.yourdomain.com
Authorization: Bearer YOUR_CUSTOMER_TOKEN
Content-Type: application/json

{
  "productId": 1,
  "quantity": 2
}
Response:

json
Copy
{
  "data": {
    "id": 1,
    "productId": 1,
    "quantity": 2,
    "status": "Pending",
    "customerId": 1
  }
}
2. Get All Orders (Supplier Only)
Endpoint: GET /orders

Description: Retrieve a list of all orders. Only accessible by authenticated suppliers.

Authentication: Supplier token required.

Request:

http
Copy
GET /orders HTTP/1.1
Host: api.yourdomain.com
Authorization: Bearer YOUR_SUPPLIER_TOKEN
Response:

json
Copy
{
  "data": [
    {
      "id": 1,
      "productId": 1,
      "quantity": 2,
      "status": "Pending",
      "customerId": 1
    }
  ]
}
3. Update Order Status (Supplier Only)
Endpoint: PUT /orders/{orderId}/status

Description: Update the status of an order. Only accessible by authenticated suppliers.

Authentication: Supplier token required.

Request:

http
Copy
PUT /orders/1/status HTTP/1.1
Host: api.yourdomain.com
Authorization: Bearer YOUR_SUPPLIER_TOKEN
Content-Type: application/json

{
  "status": "Shipped"
}
Response:

json
Copy
{
  "data": {
    "id": 1,
    "status": "Shipped"
  }
}
4. Cancel Order (Customer Only)
Endpoint: DELETE /orders/{orderId}

Description: Cancel an order. Only accessible by authenticated customers.

Authentication: Customer token required.

Request:

http
Copy
DELETE /orders/1 HTTP/1.1
Host: api.yourdomain.com
Authorization: Bearer YOUR_CUSTOMER_TOKEN
Response:

json
Copy
{
  "message": "Order canceled successfully."
}
5. Get Customer Orders
Endpoint: GET /orders/customer

Description: Retrieve all orders for the authenticated customer.

Authentication: Customer token required.

Request:

http
Copy
GET /orders/customer HTTP/1.1
Host: api.yourdomain.com
Authorization: Bearer YOUR_CUSTOMER_TOKEN
Response:

json
Copy
{
  "data": [
    {
      "id": 1,
      "productId": 1,
      "quantity": 2,
      "status": "Pending",
      "customerId": 1
    }
  ]
}
Products
1. Get All Products
Endpoint: GET /products

Description: Retrieve a list of all products.

Authentication: None.

Request:

http
Copy
GET /products HTTP/1.1
Host: api.yourdomain.com
Response:

json
Copy
{
  "data": [
    {
      "id": 1,
      "name": "Product A",
      "price": 19.99,
      "stock": 100
    }
  ]
}
2. Get Product by ID
Endpoint: GET /products/{id}

Description: Retrieve a specific product by its ID.

Authentication: None.

Request:

http
Copy
GET /products/1 HTTP/1.1
Host: api.yourdomain.com
Response:

json
Copy
{
  "data": {
    "id": 1,
    "name": "Product A",
    "price": 19.99,
    "stock": 100
  }
}
3. Create a Product
Endpoint: POST /products

Description: Create a new product.

Authentication: Supplier token required.

Request:

http
Copy
POST /products HTTP/1.1
Host: api.yourdomain.com
Authorization: Bearer YOUR_SUPPLIER_TOKEN
Content-Type: application/json

{
  "name": "Product B",
  "price": 29.99,
  "stock": 50
}
Response:

json
Copy
{
  "data": {
    "id": 2,
    "name": "Product B",
    "price": 29.99,
    "stock": 50
  }
}
4. Update a Product
Endpoint: PUT /products/{id}

Description: Update an existing product.

Authentication: Supplier token required.

Request:

http
Copy
PUT /products/1 HTTP/1.1
Host: api.yourdomain.com
Authorization: Bearer YOUR_SUPPLIER_TOKEN
Content-Type: application/json

{
  "name": "Updated Product A",
  "price": 24.99
}
Response:

json
Copy
{
  "data": {
    "id": 1,
    "name": "Updated Product A",
    "price": 24.99,
    "stock": 100
  }
}
5. Delete a Product
Endpoint: DELETE /products/{id}

Description: Delete a product.

Authentication: Supplier token required.

Request:

http
Copy
DELETE /products/1 HTTP/1.1
Host: api.yourdomain.com
Authorization: Bearer YOUR_SUPPLIER_TOKEN
Response:

json
Copy
{
  "message": "Product deleted successfully."
}
6. Search Products
Endpoint: GET /products/search

Description: Search for products by name or other criteria.

Authentication: None.

Request:

http
Copy
GET /products/search?query=ProductA HTTP/1.1
Host: api.yourdomain.com
Response:

json
Copy
{
  "data": [
    {
      "id": 1,
      "name": "Product A",
      "price": 19.99,
      "stock": 100
    }
  ]
}
7. Bulk Insert Products
Endpoint: POST /products/bulk

Description: Insert multiple products at once.

Authentication: Supplier token required.

Request:

http
Copy
POST /products/bulk HTTP/1.1
Host: api.yourdomain.com
Authorization: Bearer YOUR_SUPPLIER_TOKEN
Content-Type: application/json

[
  {
    "name": "Product C",
    "price": 39.99,
    "stock": 200
  },
  {
    "name": "Product D",
    "price": 49.99,
    "stock": 150
  }
]
Response:

json
Copy
{
  "data": [
    {
      "id": 3,
      "name": "Product C",
      "price": 39.99,
      "stock": 200
    },
    {
      "id": 4,
      "name": "Product D",
      "price": 49.99,
      "stock": 150
    }
  ]
}
8. Add Stock to a Product
Endpoint: PATCH /products/{id}/add-stock

Description: Add stock to an existing product.

Authentication: Supplier token required.

Request:

http
Copy
PATCH /products/1/add-stock HTTP/1.1
Host: api.yourdomain.com
Authorization: Bearer YOUR_SUPPLIER_TOKEN
Content-Type: application/json

{
  "quantity": 50
}
Response:

json
Copy
{
  "data": {
    "id": 1,
    "name": "Product A",
    "price": 19.99,
    "stock": 150
  }
}
Suppliers
1. Register a Supplier
Endpoint: POST /suppliers/register

Description: Register a new supplier.

Authentication: None.

Request:

http
Copy
POST /suppliers/register HTTP/1.1
Host: api.yourdomain.com
Content-Type: application/json

{
  "name": "Supplier A",
  "email": "supplier@example.com",
  "password": "securepassword123"
}
Response:

json
Copy
{
  "data": {
    "id": 1,
    "name": "Supplier A",
    "email": "supplier@example.com"
  }
}
2. Login a Supplier
Endpoint: POST /suppliers/login

Description: Authenticate a supplier and return a token.

Authentication: None.

Request:

http
Copy
POST /suppliers/login HTTP/1.1
Host: api.yourdomain.com
Content-Type: application/json

{
  "email": "supplier@example.com",
  "password": "securepassword123"
}
Response:

json
Copy
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
## Error Responses

All endpoints return a 500 Internal Server Error with a message if an unexpected error occurs:

