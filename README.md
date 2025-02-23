Here's a full README for your **Inventory Management API** in Markdown format:

```markdown
# Inventory Management API 🛒

Welcome to the **Inventory Management API**! This API provides endpoints for managing products, customers, orders, and suppliers within an inventory system. Whether you're handling individual product entries or managing large-scale operations, this API supports a wide range of actions, including creating, reading, updating, and deleting products, as well as managing stock levels, customer profiles, and orders.

## Features ✨
- **Customer Management**: Register, log in, view and update customer profiles.
- **Order Management**: Place orders, view order status, and manage cancellations.
- **Product Management**: Add, update, delete, and search products. Handle stock levels.
- **Supplier Management**: Register suppliers, authenticate, and manage product listings.

## Base URL 🌍

All endpoints are relative to the base URL:

```
https://localhost:3000/api/products
```

---

## Authentication 🔑

- **Customer Authentication**: Use the customer token to interact with customer-specific endpoints.
- **Supplier Authentication**: Use the supplier token to access supplier-specific actions.
  
Authentication is done via **Bearer tokens** passed in the `Authorization` header.

---

## Endpoints 📡

### **Customers**

#### 1. Get All Customers (Supplier Only)
- **Endpoint**: `GET /customers`
- **Description**: Retrieve a list of all customers (authenticated suppliers only).
- **Authentication**: Supplier token required.

---

#### 2. Register a Customer
- **Endpoint**: `POST /customers/register`
- **Description**: Register a new customer.
- **Authentication**: None.

---

#### 3. Login a Customer
- **Endpoint**: `POST /customers/login`
- **Description**: Authenticate a customer and return a token.
- **Authentication**: None.

---

#### 4. Get Customer Profile
- **Endpoint**: `GET /customers/profile`
- **Description**: Retrieve the profile of the authenticated customer.
- **Authentication**: Customer token required.

---

#### 5. Update Customer Profile
- **Endpoint**: `PUT /customers/profile`
- **Description**: Update the profile of the authenticated customer.
- **Authentication**: Customer token required.

---

### **Orders**

#### 1. Place an Order (Customer Only)
- **Endpoint**: `POST /orders`
- **Description**: Place a new order (authenticated customers only).
- **Authentication**: Customer token required.

---

#### 2. Get All Orders (Supplier Only)
- **Endpoint**: `GET /orders`
- **Description**: Retrieve all orders (authenticated suppliers only).
- **Authentication**: Supplier token required.

---

#### 3. Update Order Status (Supplier Only)
- **Endpoint**: `PUT /orders/{orderId}/status`
- **Description**: Update the status of an order (authenticated suppliers only).
- **Authentication**: Supplier token required.

---

#### 4. Cancel Order (Customer Only)
- **Endpoint**: `DELETE /orders/{orderId}`
- **Description**: Cancel an order (authenticated customers only).
- **Authentication**: Customer token required.

---

#### 5. Get Customer Orders
- **Endpoint**: `GET /orders/customer`
- **Description**: Retrieve all orders for the authenticated customer.
- **Authentication**: Customer token required.

---

### **Products**

#### 1. Get All Products
- **Endpoint**: `GET /products`
- **Description**: Retrieve a list of all products.
- **Authentication**: None.

---

#### 2. Get Product by ID
- **Endpoint**: `GET /products/{id}`
- **Description**: Retrieve a specific product by its ID.
- **Authentication**: None.

---

#### 3. Create a Product
- **Endpoint**: `POST /products`
- **Description**: Create a new product (authenticated suppliers only).
- **Authentication**: Supplier token required.

---

#### 4. Update a Product
- **Endpoint**: `PUT /products/{id}`
- **Description**: Update an existing product (authenticated suppliers only).
- **Authentication**: Supplier token required.

---

#### 5. Delete a Product
- **Endpoint**: `DELETE /products/{id}`
- **Description**: Delete a product (authenticated suppliers only).
- **Authentication**: Supplier token required.

---

#### 6. Search Products
- **Endpoint**: `GET /products/search`
- **Description**: Search for products by name or other criteria.
- **Authentication**: None.

---

#### 7. Bulk Insert Products
- **Endpoint**: `POST /products/bulk`
- **Description**: Insert multiple products at once (authenticated suppliers only).
- **Authentication**: Supplier token required.

---

#### 8. Add Stock to a Product
- **Endpoint**: `PATCH /products/{id}/add-stock`
- **Description**: Add stock to an existing product (authenticated suppliers only).
- **Authentication**: Supplier token required.

---

### **Suppliers**

#### 1. Register a Supplier
- **Endpoint**: `POST /suppliers/register`
- **Description**: Register a new supplier.
- **Authentication**: None.

---

#### 2. Login a Supplier
- **Endpoint**: `POST /suppliers/login`
- **Description**: Authenticate a supplier and return a token.
- **Authentication**: None.

---

## Error Responses 🚨

All endpoints return a **500 Internal Server Error** with a message if an unexpected error occurs.

Example error response:
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong. Please try again later."
}
```

---

## Example Request & Response 📑

### Example: Create a New Product
**Request:**
```http
POST /products HTTP/1.1
Host: api.yourdomain.com
Authorization: Bearer YOUR_SUPPLIER_TOKEN
Content-Type: application/json

{
  "name": "Product B",
  "price": 29.99,
  "stock": 50
}
```

**Response:**
```json
{
  "data": {
    "id": 2,
    "name": "Product B",
    "price": 29.99,
    "stock": 50
  }
}
```

---

## Notes 📝

- All authentication tokens should be included as `Bearer YOUR_TOKEN` in the request headers.
- To test the API, make sure you have a valid **supplier** or **customer** token for relevant operations.
- Each request should be carefully constructed based on the required method (GET, POST, PUT, DELETE, PATCH).

---

## Contributing 🤝

We welcome contributions to the project! Please fork the repository, create a new branch, and submit a pull request for any bug fixes, improvements, or new features.

---

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

This README provides a clean and comprehensive overview of the **Inventory Management API**, with relevant sections for easy navigation. It includes emoji markers to keep things visually engaging and a bit more friendly!
