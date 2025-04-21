const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ where: { username } });
        if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create default admin (run once)
exports.createDefaultAdmin = async () => {
    const username = 'admin';
    const password = await bcrypt.hash('admin123', 10);
    await Admin.findOrCreate({
        where: { username },
        defaults: {
            username,
            password,
            name: 'Admin User',
            email: 'info@hub64.com',
            role: 'Administrator',
        },
    });
};