const { Op } = require('sequelize');
const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    const { category, search, sort, limit } = req.query;
    const where = {};
    if (category && category !== 'All') where.category = category;
    if (search) where.name = { [Op.iLike]: `%${search}%` };

    const order = sort === 'priceAsc' ? [['salePrice', 'ASC']] : sort === 'priceDesc' ? [['salePrice', 'DESC']] : [];

    try {
        const products = await Product.findAll({
            where,
            order,
            limit: limit ? parseInt(limit) : undefined,
        });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createProduct = async (req, res) => {
    const { name, description, features, salePrice, originalPrice, discount, category, condition, stock_quantity } = req.body;
    const images = req.files ? req.files.map(file => `/images/${file.filename}`) : [];

    try {
        const product = await Product.create({
            name,
            description,
            features: features ? JSON.parse(features) : [],
            salePrice,
            originalPrice,
            discount,
            category,
            condition,
            images,
            stock_quantity,
        });
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateProduct = async (req, res) => {
    const { name, description, features, salePrice, originalPrice, discount, category, condition, stock_quantity } = req.body;
    const images = req.files ? req.files.map(file => `/images/${file.filename}`) : undefined;

    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        product.name = name || product.name;
        product.description = description || product.description;
        product.features = features ? JSON.parse(features) : product.features;
        product.salePrice = salePrice || product.salePrice;
        product.originalPrice = originalPrice || product.originalPrice;
        product.discount = discount || product.discount;
        product.category = category || product.category;
        product.condition = condition || product.condition;
        product.stock_quantity = stock_quantity || product.stock_quantity;
        if (images) product.images = images;

        await product.save();
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await product.destroy();
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};