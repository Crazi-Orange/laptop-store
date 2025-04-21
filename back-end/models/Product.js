const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    features: { type: DataTypes.JSON },
    salePrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    originalPrice: { type: DataTypes.DECIMAL(10, 2) },
    discount: { type: DataTypes.INTEGER },
    category: { type: DataTypes.STRING, allowNull: false },
    condition: { type: DataTypes.STRING, defaultValue: 'Brand New' },
    images: { type: DataTypes.JSON, defaultValue: [] },
    stock_quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
});

module.exports = Product;