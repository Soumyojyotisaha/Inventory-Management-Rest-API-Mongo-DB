import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chatbot.css";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        text: "Welcome to the Inventory Management Assistant! How can I help you today? You can ask about:\n- My profile\n- My orders\n- Available products\n- Product availability\n- Order status",
        sender: "bot"
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Simple greetings responses
  const greetings = {
    "hi": "Hello! How can I assist you with your inventory needs today?",
    "hello": "Hi there! What can I help you with?",
    "hey": "Hey! Ready to help with your inventory questions.",
    "hi there": "Hello! Ask me about products, orders, or your account."
  };

  const fetchReports = async () => {
    try {
      const jwtToken = localStorage.getItem("customer-jwtToken");
      if (!jwtToken) {
        console.error("Customer JWT token not found in local storage.");
        return;
      }

      setIsLoading(true);

      // Fetch customer profile
      const profileResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE}/api/customers/profile`,
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );
      const profile = profileResponse.data;
      const profileContext = `CUSTOMER PROFILE:\n- Name: ${profile.name}\n- Email: ${profile.email}\n- Address: ${profile.address || 'Not specified'}`;
      localStorage.setItem("customerProfileContext", profileContext);

      // Fetch customer orders
      const ordersResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE}/api/orders/customer`,
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );
      const orders = ordersResponse.data;
      const ordersContext = `YOUR ORDERS (${orders.length}):\n${orders
        .slice(0, 5) // Show only recent 5 orders
        .map(
          (order) => 
            `- Order ID: ${order._id}\n  Date: ${new Date(order.createdAt).toLocaleDateString()}\n  Total: ₹${order.totalAmount.toFixed(2)}\n  Status: ${order.status}\n  Items: ${order.items.map(item => `${item.product.name} (Qty: ${item.quantity})`).join(', ')}`
        )
        .join("\n")}`;
      localStorage.setItem("customerOrdersContext", ordersContext);

      // Fetch available products
      const productsResponse = await axios.get(
        `${process.env.REACT_APP_API_BASE}/api/products/`
      );
      const products = productsResponse.data;
      const productsContext = `AVAILABLE PRODUCTS (${products.length}):\n${products
        .slice(0, 10) // Show only first 10 products
        .map(
          (product) => 
            `- ${product.name}\n  Price: ₹${product.price.toFixed(2)}\n  Stock: ${product.quantity}\n  Category: ${product.category || 'Uncategorized'}`
        )
        .join("\n")}`;
      localStorage.setItem("availableProductsContext", productsContext);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setIsLoading(false);
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      fetchReports();
    }
  };

  const handleSimpleQuery = (input) => {
    const lowerInput = input.toLowerCase().trim();
    
    // Check for greetings
    if (greetings[lowerInput]) {
      return greetings[lowerInput];
    }

    // Check for thanks
    if (lowerInput.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?";
    }

    return null;
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Check for simple queries first
    const simpleResponse = handleSimpleQuery(input);
    if (simpleResponse) {
      setMessages((prev) => [...prev, { text: simpleResponse, sender: "bot" }]);
      return;
    }

    // Show loading indicator
    setMessages((prev) => [...prev, { text: "Typing...", sender: "bot" }]);

    try {
      // Check for specific queries that use local storage
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes("profile") || lowerInput.includes("my account")) {
        const profileContext = localStorage.getItem("customerProfileContext") || 
          "I couldn't find your profile information. Please try again later.";
        setMessages((prev) => [...prev.slice(0, -1), { text: profileContext, sender: "bot" }]);
        return;
      }

      if (lowerInput.includes("order") || lowerInput.includes("my orders")) {
        const ordersContext = localStorage.getItem("customerOrdersContext") || 
          "I couldn't find your order history. Please try again later.";
        setMessages((prev) => [...prev.slice(0, -1), { text: ordersContext, sender: "bot" }]);
        return;
      }

      if (lowerInput.includes("product") || lowerInput.includes("available") || lowerInput.includes("stock")) {
        const productsContext = localStorage.getItem("availableProductsContext") || 
          "I couldn't retrieve product information. Please try again later.";
        setMessages((prev) => [...prev.slice(0, -1), { text: productsContext, sender: "bot" }]);
        return;
      }

      // For other queries, use Mistral AI with proper context
      const profileContext = localStorage.getItem("customerProfileContext") || "";
      const ordersContext = localStorage.getItem("customerOrdersContext") || "";
      const productsContext = localStorage.getItem("availableProductsContext") || "";

      const context = `
        You are an assistant for an inventory management system. 
        The user is a customer interacting with the system.
        ${profileContext}
        ${ordersContext}
        ${productsContext}
        
        Current date: ${new Date().toLocaleDateString()}
        
        Instructions:
        - Be polite and helpful
        - For order status inquiries, check the orders context first
        - For product availability, check the products context
        - Keep responses concise but informative
        - If you don't know the answer, say you'll look into it
      `;

      const response = await axios.post(
        "https://api.mistral.ai/v1/chat/completions",
        {
          model: "mistral-small-latest",
          messages: [
            {
              role: "system",
              content: context
            },
            {
              role: "user",
              content: input
            }
          ],
          temperature: 0.7
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_MISTRAL_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botResponse = response.data.choices[0].message.content;
      setMessages((prev) => [...prev.slice(0, -1), { text: botResponse, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
      const errorResponses = [
        "I'm having some technical difficulties. Maybe try asking about your orders or products?",
        "I can't connect to my knowledge base right now, but I can still help with basic questions.",
        "Let me try that again. In the meantime, you can ask about your profile or available products."
      ];
      
      const friendlyError = errorResponses[Math.floor(Math.random() * errorResponses.length)];
      
      setMessages((prev) => [...prev.slice(0, -1), { 
        text: friendlyError, 
        sender: "bot" 
      }]);
    }
  };

  const clearChat = () => {
    setMessages([]);
    console.log("Chat cleared.");
  };

  return (
    <div className="chatbot-container">
      <div className={`chatbot ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <h4>Inventory Assistant</h4>
          <button onClick={toggleChatbot}>
            {isOpen ? "↓" : "Chat with Us"}
          </button>
        </div>
        {isOpen && (
          <div className="chatbot-body">
            <div className="chatbot-clear" onClick={clearChat}>
              Clear Chat
            </div>
            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <div key={index}>
                  <div
                    className={`chatbot-message ${
                      message.sender === "user" ? "user" : "bot"
                    }`}
                  >
                    {message.text.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="chatbot-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={isLoading}
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading || input.trim() === ""}
              >
                {isLoading ? "..." : "Send"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatbot;