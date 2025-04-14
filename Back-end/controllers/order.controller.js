const Order = require("../models/order.model");
const Product = require("../models/product.model");
const { sendEmail } = require("../utils/mailer.js");


// ✅ Place an Order (Stock Validation & Auto Price Calculation)
const placeOrder = async (req, res) => {
  try {
    const customerId = req.customer.id;
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in the order" });
    }

    let totalAmount = 0;
    const updatedProducts = [];

    // ✅ Check stock & calculate total amount
    for (const item of products) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }

      if (item.quantity > product.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}, available: ${product.quantity}` });
      }

      totalAmount += product.price * item.quantity;
      updatedProducts.push({ product: product._id, quantity: item.quantity });

      // ✅ Deduct stock
      product.quantity -= item.quantity;
      await product.save();
    }

    // ✅ Create new order
    const newOrder = new Order({
      customer: customerId,
      products: updatedProducts,
      totalAmount, // ✅ Save total amount
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: {
        _id: newOrder._id,
        products: newOrder.products,
        totalAmount: newOrder.totalAmount, // ✅ Include total amount in response
        status: newOrder.status,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ View All Orders (For Suppliers)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "customer",
        select: "name email", // Fetch only the customer's name and email
      })
      .populate({
        path: "products.product",
        select: "name price", // Fetch product name & price
      });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Order Status (Only Suppliers)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // ✅ Allowed Statuses
    const allowedStatuses = ["Pending", "Processing", "Shipped", "Delivered"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    // ✅ Find and Update the Order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate({
      path: "customer", // ✅ Corrected: Use "customer" as per your schema
      select: "name email",
    });

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // ✅ Send Email Notification 📩
    const { id, name, email } = updatedOrder.customer; // ✅ Corrected: Access using 'customer'
    const emailSubject = `Order Status Update: ${status}`;
    const emailBody = `
      Dear ${name},

      Your order (Order ID: ${updatedOrder._id}) status has been updated to: ${status}.

      Thank you for choosing our service!
      
      Regards,
      E-Commerce Team
    `;

    const emailSent = await sendEmail(email, emailSubject, emailBody);

    res.status(200).json({
      message: emailSent
        ? "Order status updated & email notification sent"
        : "Order status updated, but email failed",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Cancel Order (Only Customers)
const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order
    const order = await Order.findById(orderId).populate({
      path: "customer",
      select: "name email",
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the order is already processed
    if (order.status !== "Pending") {
      return res
        .status(400)
        .json({ message: "Order cannot be cancelled as it is already processed" });
    }

    // Restore stock for each product
    for (const item of order.products) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { quantity: item.quantity }, // Add back the stock
      });
    }

    // Delete the order
    await Order.findByIdAndDelete(orderId);

    // ✅ Send Email Notification 📩
    const emailSubject = "Order Cancellation Confirmation";
    const emailBody = `
      Dear ${order.customer.name},

      Your order (ID: ${orderId}) has been successfully canceled.

      If you have any questions, feel free to contact us.

      Regards,
      E-Commerce Team
    `;

    const emailSent = await sendEmail(order.customer.email, emailSubject, emailBody);

    res.status(200).json({
      message: emailSent
        ? "Order cancelled successfully & email notification sent"
        : "Order cancelled successfully, but email failed",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ get customer order details
const getCustomerOrders = async (req, res) => {
  try {
    const customerId = req.customer.id; // Get customer ID from token

    // Fetch orders belonging to this customer
    const orders = await Order.find({ customer: customerId })
      .populate({
        path: "products.product",
        select: "name price", // Fetch product name & price
      });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this customer." });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { placeOrder, getAllOrders, updateOrderStatus, cancelOrder,getCustomerOrders };
