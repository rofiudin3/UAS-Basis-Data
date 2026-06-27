const { Op } = require('sequelize');
const { Game, Category } = require('../models');

// Controller untuk logika pencarian, filter, dan list game
module.exports = {
  // Mendapatkan semua game, dengan opsional search query dan filter kategori
  getStorePage: async (req, res) => {
    try {
      const { search, category, maxPrice } = req.query;
      
      // Definisikan kondisi filter
      let whereCondition = {};
      
      // 1. Pencarian berdasarkan judul game (menggunakan LIKE operator SQL)
      if (search) {
        whereCondition.title = {
          [Op.like]: `%${search}%`
        };
      }
      
      // 2. Filter berdasarkan kategori
      if (category) {
        whereCondition.category_id = category;
      }
      
      // 3. Filter berdasarkan harga maksimal
      if (maxPrice) {
        whereCondition.price = {
          [Op.lte]: parseFloat(maxPrice)
        };
      }

      // Query database untuk mengambil data game beserta kategori-nya
      // Eager loading Category demi efisiensi query basis data
      const games = await Game.findAll({
        where: whereCondition,
        include: [{ model: Category, as: 'category' }],
        order: [['title', 'ASC']]
      });

      // Ambil daftar semua kategori untuk ditampilkan di sidebar filter UI
      const categories = await Category.findAll({ order: [['name', 'ASC']] });

      // Render halaman store.ejs
      res.render('pages/store', {
        title: 'VaporVault - Store',
        games,
        categories,
        query: req.query
      });
    } catch (error) {
      console.error('Error fetching games for store:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  // REST API: Mengambil data JSON game (untuk AJAX atau fetch query kompleks)
  getGamesApi: async (req, res) => {
    try {
      const games = await Game.findAll({
        include: [{ model: Category, as: 'category' }]
      });
      res.json(games);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
