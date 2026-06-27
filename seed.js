const { sequelize, User, Category, Game, Library } = require('./models');

async function seedDatabase() {
  try {
    console.log('Menghubungkan ke database...');
    // Sinkronisasi database (force: true akan menghapus tabel lama jika ada dan membuat baru)
    await sequelize.sync({ force: true });
    console.log('Database synced! Mulai memasukkan data awal...');

    // 1. Seed Categories (Kategori Game)
    const action = await Category.create({ name: 'Action & Adventure' });
    const rpg = await Category.create({ name: 'RPG (Role-Playing Game)' });
    const strategy = await Category.create({ name: 'Strategy & Simulation' });
    const indie = await Category.create({ name: 'Indie & Casual' });

    console.log('Kategori berhasil dibuat.');

    // 2. Seed Games (Daftar Game Toko)
    const gamesData = [
      {
        title: 'Cyberpunk Redux',
        description: 'Jelajahi megacity masa depan yang megah namun dipenuhi dengan kriminalitas. Kustomisasi implan tubuh Anda dan kuasai jalanan.',
        price: 249000.00,
        image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=460&auto=format&fit=crop',
        category_id: rpg.id
      },
      {
        title: 'Elden Ring: Shadow',
        description: 'Tantang diri Anda dalam dunia fantasi gelap yang luas dan menegangkan. Kalahkan bos-bos legendaris dengan gameplay aksi tingkat tinggi.',
        price: 599000.00,
        image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=460&auto=format&fit=crop',
        category_id: action.id
      },
      {
        title: 'Stardew Valley',
        description: 'Warisi ladang tua kakekmu dan mulailah kehidupan bertani yang santai, bersosialisasi dengan penduduk desa, dan rawat hewan ternak.',
        price: 115999.00,
        image_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=460&auto=format&fit=crop',
        category_id: indie.id
      },
      {
        title: 'Age of Empires IV',
        description: 'Pimpin peradaban historis Anda menuju kejayaan melalui pertempuran strategis real-time, pembangunan kota, dan taktik perang kolosal.',
        price: 299000.00,
        image_url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=460&auto=format&fit=crop',
        category_id: strategy.id
      },
      {
        title: 'Hollow Knight',
        description: 'Petualangan aksi 2D klasik melintasi kerajaan serangga bawah tanah yang runtuh. Temukan rahasia kuno dan hadapi monster berbahaya.',
        price: 120000.00,
        image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=460&auto=format&fit=crop',
        category_id: indie.id
      },
      {
        title: 'Counter-Strike 2',
        description: 'Game penembak taktis orang pertama legendaris berbasis tim yang kompetitif. Pertempuran sengit antara Teroris dan Counter-Teroris.',
        price: 0.00, // Free to Play
        image_url: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=460&auto=format&fit=crop',
        category_id: action.id
      }
    ];

    const createdGames = await Game.bulkCreate(gamesData);
    console.log(`${createdGames.length} game berhasil ditambahkan.`);

    // 3. Seed Default User (User Demo UAS)
    // Password diset mentah untuk kemudahan demo UAS Basis Data
    const defaultUser = await User.create({
      username: 'ugasrofiudin',
      email: 'ugas@vaporvault.id',
      password: 'password123',
      balance: 750000.00 // Saldo awal yang melimpah untuk demo checkout
    });

    console.log('User demo berhasil dibuat.');

    // 4. Seed Awal Game di Library milik User (Opsional sebagai data awal)
    // Menghubungkan User ID 1 dengan Game Gratis (CS 2)
    const csGame = createdGames.find(g => g.price === 0);
    if (csGame) {
      await Library.create({
        user_id: defaultUser.id,
        game_id: csGame.id,
        playtime_hours: 12.4, // Simulasi playtime awal
        installation_status: 'Installed'
      });
      console.log('Library awal ditambahkan.');
    }

    console.log('--- SEEDING DATABASE SELESAI ---');
    process.exit(0);
  } catch (error) {
    console.error('Gagal melakukan seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
