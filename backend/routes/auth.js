const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup endpoint
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Create a new user
        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Login endpoint
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET || "your_secret_key", // Replace with .env secret in production
            { expiresIn: "1h" }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


// Guest login route
router.post('/guest', (req, res) => {
    try {
        // Create a guest user object
        const guestUser = {
            name: "Guest User",
            email: `guest_${Date.now()}@example.com`, // Unique email
            role: "guest",
        };

        // Generate a token
        const token = jwt.sign(
            { id: guestUser.email, role: guestUser.role },
            process.env.JWT_SECRET || "your_secret_key", // Replace with a secure key
            { expiresIn: "1h" } // Token valid for 1 hour
        );

        // Respond with guest user details and token
        res.status(200).json({
            success: true,
            message: "Logged in as Guest",
            user: guestUser,
            token: token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Guest login failed",
        });
    }
});


// Get user details by token
router.get('/me', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Bearer header
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const secret = process.env.JWT_SECRET || "your_secret_key"; // Ensure a secret is provided
        const decoded = jwt.verify(token, secret); // Verify token

        // Handle guest users
        if (decoded.role === 'guest') {
            return res.json({
                id: decoded.id,
                username: decoded.name || 'Guest User',
                email: decoded.id, // Using email as id for guests
                role: 'guest',
            });
        }

        const user = await User.findById(decoded.id).select('-password'); // Fetch user excluding password
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid token' });
    }
});


module.exports = router;