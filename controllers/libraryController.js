const { Library, Game, User } = require('../models');

module.exports = {
  // Mengambil data pustaka game milik user beserta statistik playtime & instalasi
  getLibraryPage: async (req, res) => {
    try {
      const userId = 1; // Demo default User ID 1
      const user = await User.findByPk(userId);

      // Eager Loading: Mengambil data Library milik user berserta relasi Game
      // Ini akan menghasilkan SQL JOIN antara tabel libraries dan games
      const libraryEntries = await Library.findAll({
        where: { user_id: userId },
        include: [{ model: Game, as: 'game' }],
        order: [['createdAt', 'DESC']]
      });

      // Menghitung statistik library menggunakan data yang ditarik
      let totalPlaytime = 0;
      let installedCount = 0;
      const totalGames = libraryEntries.length;

      libraryEntries.forEach(entry => {
        totalPlaytime += parseFloat(entry.playtime_hours);
        if (entry.installation_status === 'Installed' || entry.installation_status === 'Ready to Play') {
          installedCount++;
        }
      });

      res.render('pages/library', {
        title: 'VaporVault - My Library',
        user,
        libraryEntries,
        stats: {
          totalGames,
          totalPlaytime: totalPlaytime.toFixed(1),
          installedCount
        }
      });
    } catch (error) {
      console.error('Error fetching user library:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  // Simpan / update status instalasi game
  updateStatus: async (req, res) => {
    try {
      const { libraryId, status } = req.body;
      const libraryEntry = await Library.findByPk(libraryId);

      if (!libraryEntry) {
        return res.status(404).json({ success: false, message: 'Data library tidak ditemukan' });
      }

      await libraryEntry.update({ installation_status: status });
      res.json({ success: true, message: `Status instalasi diubah menjadi: ${status}` });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // Simulasikan main game (menambah jam playtime secara acak)
  simulatePlaytime: async (req, res) => {
    try {
      const { libraryId } = req.body;
      const libraryEntry = await Library.findByPk(libraryId);

      if (!libraryEntry) {
        return res.status(404).json({ success: false, message: 'Data library tidak ditemukan' });
      }

      // Tambahkan antara 0.5 hingga 3 jam playtime secara acak
      const additionalHours = parseFloat((Math.random() * (3.0 - 0.5) + 0.5).toFixed(1));
      const newPlaytime = parseFloat(libraryEntry.playtime_hours) + additionalHours;

      await libraryEntry.update({
        playtime_hours: newPlaytime,
        installation_status: 'Ready to Play' // Otomatis diset ready/installed jika dimainkan
      });

      res.json({
        success: true,
        message: `Anda baru saja bermain game selama ${additionalHours} jam!`,
        newPlaytime: newPlaytime.toFixed(1)
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};
