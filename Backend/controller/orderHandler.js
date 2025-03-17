// Backend - Updated orderHandler.js with user association
const express = require('express');
const router = express.Router();
const Order = require('../models/orderSchema');
const { restrictToLoggedinUserOnly } = require('../middlewares/auth'); // Import the auth middleware

// Apply auth middleware to ensure we have the user ID
router.post('/',async (req, res) => {
    console.log('Received order data:', req.body); // Debug log

    try {
        // Validate the entire request body
        if (!req.body) {
            throw new Error('No order data received');
        }

        // Check if numbers are valid
        const subtotal = parseFloat(req.body.subtotal);
        const shipping = parseFloat(req.body.shipping || 0);
        const tax = parseFloat(req.body.tax || 0);
        const total = parseFloat(req.body.total);

        if (isNaN(subtotal) || isNaN(total)) {
            throw new Error('Invalid subtotal or total amount');
        }

        // Create order data with verified values
        const orderData = {
            customer: {
                firstName: req.body.customer.firstName,
                lastName: req.body.customer.lastName,
                address1: req.body.customer.address1,
                address2: req.body.customer.address2,
                country: req.body.customer.country,
                state: req.body.customer.state,
                city: req.body.customer.city,
                zipCode: req.body.customer.zipCode,
                phone: req.body.customer.phone
            },
            items: req.body.items.map(item => ({
                title: item.title,
                price: parseFloat(item.price),
                quantity: parseInt(item.quantity),
                image: item.image
            })),
            subtotal: subtotal,
            shipping: shipping,
            tax: tax,
            total: total,
            status: 'pending',
            createdBy: req.userId // Associate the order with the logged-in user
        };

        console.log('Processed order data with user ID:', orderData); // Debug log

        const newOrder = new Order(orderData);
        const savedOrder = await newOrder.save();
        console.log('Saved order:', savedOrder); // Debug log

        res.status(201).json({
            success: true,
            orderNumber: savedOrder.orderNumber,
            message: 'Order created successfully'
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message,
            receivedData: req.body // Include received data in error response
        });
    }
});

// Add a route to get all orders for the current user
router.get('/my-orders', restrictToLoggedinUserOnly, async (req, res) => {
    try {
        const orders = await Order.find({ createdBy: req.userId }).sort({ orderDate: -1 });
        res.json({
            success: true,
            orders: orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
});

module.exports = router;