require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const { createDefaultAdmin } = require('./controllers/authController');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/images', express.static('public/images'));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
sequelize.sync({ force: true }).then(() => {
    // Create default admin after tables are created
    return createDefaultAdmin();
}).then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
}).catch((err) => {
    console.error('Failed to sync database or create default admin:', err);
    process.exit(1);
});