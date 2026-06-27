web application/stitch/projects/1643893590268616539/screens/d283dd90354743259936aefc900d2189
// database/migrations/create_tables.sql

/**
 * Tabel: users
 * Menyimpan informasi akun pengguna dan saldo (balance).
 */
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Password terenkripsi
    balance DECIMAL(15, 2) DEFAULT 0.00, -- Saldo untuk pembelian game
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/**
 * Tabel: categories
 * Menyimpan kategori atau genre game.
 */
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

/**
 * Tabel: games
 * Menyimpan data katalog game yang tersedia di store.
 * Relasi: category_id merujuk ke tabel categories.
 */
CREATE TABLE games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    developer VARCHAR(100),
    price DECIMAL(15, 2) NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/**
 * Tabel: transactions
 * Mencatat riwayat pembelian oleh user.
 * Relasi: user_id merujuk ke tabel users.
 */
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(15, 2) NOT NULL,
    payment_method VARCHAR(50),
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

/**
 * Tabel: library
 * Tabel penghubung (pivot) antara users dan games.
 * Menyimpan status kepemilikan game dan data penggunaan.
 */
CREATE TABLE library (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    game_id INT NOT NULL,
    playtime_hours DECIMAL(10, 2) DEFAULT 0.00, -- Total waktu bermain
    installation_status ENUM('installed', 'not_installed') DEFAULT 'not_installed',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    UNIQUE(user_id, game_id) -- Memastikan user tidak memiliki game ganda
);
