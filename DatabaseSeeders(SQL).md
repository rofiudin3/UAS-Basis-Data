web application/stitch/projects/1643893590268616539/screens/53535016d83a4290b661cdc0dc7307fb
// database/seeders/seed_data.sql

-- Seeder untuk Kategori
INSERT INTO categories (name) VALUES 
('Action'), ('RPG'), ('Strategy'), ('Indie'), ('Adventure');

-- Seeder untuk Users (Minimal 3 User)
-- Query: Menambahkan user baru dengan saldo awal.
INSERT INTO users (username, email, password, balance) VALUES 
('alex_gamer', 'alex@example.com', 'hashed_password_123', 500000.00),
('beatrice_v', 'beatrice@example.com', 'hashed_password_456', 250000.00),
('charlie_dev', 'charlie@example.com', 'hashed_password_789', 1000000.00);

-- Seeder untuk Games (Minimal 10 Game)
-- Query: Menghubungkan game ke category_id yang sesuai.
INSERT INTO games (title, developer, price, category_id) VALUES 
('Elden Ring', 'FromSoftware', 599000.00, 2),
('Cyberpunk 2077', 'CD Projekt Red', 699000.00, 2),
('Hades', 'Supergiant Games', 250000.00, 4),
('Stardew Valley', 'ConcernedApe', 115000.00, 4),
('Civilization VI', 'Firaxis Games', 600000.00, 3),
('God of War', 'Santa Monica Studio', 729000.00, 1),
('Sekiro: Shadows Die Twice', 'FromSoftware', 891000.00, 1),
('Outer Wilds', 'Mobius Digital', 200000.00, 5),
('The Witcher 3', 'CD Projekt Red', 350000.00, 2),
('Terraria', 'Re-Logic', 90000.00, 4);

-- Dummy Library Data (Awal)
-- Query: Menghubungkan user ke game yang sudah "dimiliki".
INSERT INTO library (user_id, game_id, playtime_hours, installation_status) VALUES 
(1, 1, 120.5, 'installed'),
(1, 3, 45.0, 'installed'),
(2, 4, 10.2, 'not_installed');
