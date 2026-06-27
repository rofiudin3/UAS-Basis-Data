const { sequelize, User, Game, Transaction, Library } = require('../models');

module.exports = {
  // Menampilkan Halaman Cart / Checkout
  getCartPage: async (req, res) => {
    try {
      // Untuk demo UAS basis data, kita simulasikan User ter-login sebagai ID 1
      const user = await User.findByPk(1);
      
      // Ambil game acak/pilihan dari parameter query untuk ditambahkan ke keranjang belanja
      const gameId = req.query.gameId;
      let game = null;
      if (gameId) {
        game = await Game.findByPk(gameId);
      }

      res.render('pages/cart', {
        title: 'VaporVault - Shopping Cart',
        user,
        game
      });
    } catch (error) {
      console.error('Error fetching cart page:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Logika transaksi pembelian game (dengan validasi saldo & ownership)
  processPurchase: async (req, res) => {
    const { gameId } = req.body;
    const userId = 1; // Demo default User ID 1

    // Memulai Transaksi Database (ACID - Atomicity & Consistency)
    const t = await sequelize.transaction();

    try {
      // 1. Dapatkan info User dan Game secara realtime dengan lock update
      const user = await User.findByPk(userId, { transaction: t, lock: true });
      const game = await Game.findByPk(gameId, { transaction: t });

      if (!user || !game) {
        await t.rollback();
        return res.status(404).json({ success: false, message: 'User atau Game tidak ditemukan.' });
      }

      // 2. Validasi Kepemilikan (Apakah game sudah ada di Library?)
      const alreadyOwned = await Library.findOne({
        where: { user_id: userId, game_id: gameId },
        transaction: t
      });

      if (alreadyOwned) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'Anda sudah memiliki game ini di library!' });
      }

      // 3. Validasi Kecukupan Saldo
      const balance = parseFloat(user.balance);
      const price = parseFloat(game.price);

      if (balance < price) {
        await t.rollback();
        return res.status(400).json({ success: false, message: 'Saldo Anda tidak mencukupi untuk melakukan pembelian ini.' });
      }

      // 4. Update Saldo User (Potong saldo)
      const newBalance = balance - price;
      await user.update({ balance: newBalance }, { transaction: t });

      // 5. Catat ke Tabel Transactions
      await Transaction.create({
        user_id: userId,
        game_id: gameId,
        amount: price,
        transaction_date: new Date()
      }, { transaction: t });

      // 6. Masukkan ke Tabel Library (Junction Table)
      await Library.create({
        user_id: userId,
        game_id: gameId,
        playtime_hours: 0.00,
        installation_status: 'Not Installed'
      }, { transaction: t });

      // Commit semua operasi jika berhasil tanpa error
      await t.commit();

      return res.json({ 
        success: true, 
        message: 'Pembelian berhasil! Game telah ditambahkan ke library Anda.',
        newBalance: newBalance.toFixed(2)
      });

    } catch (error) {
      // Rollback jika terjadi kesalahan database atau logika di tengah proses
      await t.rollback();
      console.error('Transaksi gagal dan di-rollback:', error);
      return res.status(500).json({ success: false, message: 'Terjadi kesalahan sistem saat memproses transaksi.' });
    }
  }
};
