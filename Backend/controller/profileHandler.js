// controller/profileHandler.js
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust path as needed
const Order = require('../models/orderSchema'); // Make sure to use the correct path

// Get user profile data
router.get('/', async (req, res) => {
    try {
        const userId = req.userId; // This comes from the restrictToLoggedinUserOnly middleware
        console.log('Fetching profile for user ID:', userId); // Debug log
        
        // Find the user
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            console.log('User not found with ID:', userId); // Debug log
            return res.status(404).json({ error: 'User not found' });
        }
        
        console.log('Found user:', user.name, user.email); // Debug log
        
        // Find all orders for this user
        console.log('Searching for orders with createdBy:', userId); // Debug log
        const orders = await Order.find({ createdBy: userId }).sort({ orderDate: -1 });
        console.log('Found orders:', orders.length); // Debug log
        
        res.json({
            user,
            orders
        });
    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch profile data' });
    }
});

// Update user profile
router.put('/', async (req, res) => {
    try {
        const userId = req.userId;
        const { name, email } = req.body;
        
        // Validate input
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }
        
        // Check if email is already taken by another user
        const existingUser = await User.findOne({ email, _id: { $ne: userId } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }
        
        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true }
        ).select('-password');
        
        res.json(updatedUser);
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

module.exports = router;