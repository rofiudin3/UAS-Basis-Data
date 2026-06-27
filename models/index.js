const sequelize = require('../config/database');
const User = require('./User');
const Game = require('./Game');
const Category = require('./Category');
const Transaction = require('./Transaction');
const Library = require('./Library');

// 1. Relasi Category dan Game (One-to-Many)
// Menghubungkan Game ke Category-nya masing-masing
Category.hasMany(Game, { foreignKey: 'category_id', as: 'games' });
Game.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

// 2. Relasi User dan Game melalui Library (Many-to-Many Junction Table)
// User memiliki banyak Game di Library, dan Game bisa dimiliki banyak User
User.belongsToMany(Game, { through: Library, foreignKey: 'user_id', as: 'ownedGames' });
Game.belongsToMany(User, { through: Library, foreignKey: 'game_id', as: 'owners' });

// 3. Relasi langsung antara User/Game dengan Library (agar bisa ditarik secara spesifik)
User.hasMany(Library, { foreignKey: 'user_id', as: 'libraries' });
Library.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Game.hasMany(Library, { foreignKey: 'game_id', as: 'libraries' });
Library.belongsTo(Game, { foreignKey: 'game_id', as: 'game' });

// 4. Relasi User dan Game dengan Transaction (One-to-Many untuk mencatat history pembelian)
User.hasMany(Transaction, { foreignKey: 'user_id', as: 'transactions' });
Transaction.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Game.hasMany(Transaction, { foreignKey: 'game_id', as: 'transactions' });
Transaction.belongsTo(Game, { foreignKey: 'game_id', as: 'game' });

module.exports = {
  sequelize,
  User,
  Game,
  Category,
  Transaction,
  Library
};
