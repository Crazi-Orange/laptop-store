const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

exports.getProfile = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.admin.id, {
            attributes: { exclude: ['password'] },
        });
        res.json(admin);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProfile = async (req, res) => {
    const { name, email, phone } = req.body;
    const avatar = req.file ? `/images/${req.file.filename}` : undefined;

    try {
        const admin = await Admin.findByPk(req.admin.id);
        admin.name = name || admin.name;
        admin.email = email || admin.email;
        admin.phone = phone || admin.phone;
        if (avatar) admin.avatar = avatar;

        await admin.save();
        res.json({ message: 'Profile updated', admin: { ...admin.toJSON(), password: undefined } });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const admin = await Admin.findByPk(req.admin.id);
        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Current password is incorrect' });

        admin.password = await bcrypt.hash(newPassword, 10);
        await admin.save();
        res.json({ message: 'Password updated' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};