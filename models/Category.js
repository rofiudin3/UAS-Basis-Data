const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Skema Model Category
const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'categories'
});

module.exports = Category;
