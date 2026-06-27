const express = require('express');
const path = require('path');
const { sequelize } = require('./models');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Setup Template Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Folder static jika diperlukan untuk asset CSS / JS lokal
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use('/', webRoutes);       // Halaman web utama
app.use('/api', apiRoutes);   // Endpoint API JSON

// Menghubungkan ke database Sequelize & menjalankan server Express
async function startServer() {
  try {
    // Memverifikasi koneksi database
    await sequelize.authenticate();
    console.log('Koneksi database ke MySQL berhasil terhubung!');

    // Menjalankan Express app
    app.listen(PORT, () => {
      console.log(`Server VaporVault berjalan di: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Gagal menghubungkan ke database:', error);
  }
}

startServer();
