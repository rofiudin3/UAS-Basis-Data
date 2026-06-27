const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Skema Model Library (Junction Table antara Users dan Games)
const Library = sequelize.define('Library', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'games',
      key: 'id'
    }
  },
  playtime_hours: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  installation_status: {
    type: DataTypes.ENUM('Installed', 'Not Installed', 'Ready to Play'),
    allowNull: false,
    defaultValue: 'Not Installed'
  }
}, {
  tableName: 'libraries',
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'game_id'] // Satu user hanya boleh memiliki game yang sama satu kali di library
    }
  ]
});

module.exports = Library;
