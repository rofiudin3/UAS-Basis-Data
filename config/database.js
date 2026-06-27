const { Sequelize } = require('sequelize');
require('dotenv').config();

// Konfigurasi database menggunakan Sequelize ORM
// Menggunakan variabel lingkungan jika ada, atau default ke local MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME || 'vaporvault',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Set ke console.log jika ingin melihat raw SQL query
    define: {
      timestamps: true, // Otomatis menambahkan createdAt & updatedAt
      underscored: true // Menggunakan snake_case untuk penamaan kolom di DB
    }
  }
);

module.exports = sequelize;
