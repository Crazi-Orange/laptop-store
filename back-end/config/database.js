require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'laptop-store',
    username: 'derek',
    password: process.env.DB_PASSWORD,
});

module.exports = sequelize;