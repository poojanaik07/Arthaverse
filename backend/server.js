const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB: arthaverse'))
    .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    mobile: { type: String, required: true, unique: true },
    pin: { type: String, required: true },
    name: { type: String, required: true },
    bank: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

app.get('/api/check-user/:mobile', async (req, res) => {
    try {
        const user = await User.findOne({ mobile: req.params.mobile });
        res.status(200).json({ exists: !!user });
    } catch (error) {
        res.status(500).json({ message: 'Error checking user' });
    }
});

// Routes
app.post('/api/register', async (req, res) => {
    try {
        const { mobile, pin, name, bank } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ mobile });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this mobile number' });
        }

        const newUser = new User({ mobile, pin, name, bank });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: { name, mobile } });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { mobile, pin } = req.body;
        const user = await User.findOne({ mobile, pin });

        if (!user) {
            return res.status(401).json({ message: 'Invalid mobile number or PIN' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                name: user.name,
                mobile: user.mobile,
                bank: user.bank
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error during login' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
