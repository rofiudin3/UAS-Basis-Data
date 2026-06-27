1. Struktur Folder Proyek (VaporVault)
Struktur ini dirancang agar modular, memisahkan antara logika database, backend API, dan frontend (tampilan). Jika Anda menggunakan full-stack framework seperti Node.js (Express + React) atau Laravel, struktur ini sangat mudah diadaptasi.

Plaintext
vaporvault/
├── .github/
│   └── ISSUE_TEMPLATE/        # Template untuk Git Issues
├── config/
│   └── database.js            # Konfigurasi koneksi database (MySQL/PostgreSQL)
├── controllers/               # Logika pemrosesan data (Business Logic)
│   ├── authController.js      # Register, login, validasi sesi
│   ├── gameController.js      # Cari game, filter genre/developer
│   ├── libraryController.js   # Ambil data playtime, status install
│   └── transactionController.js # Validasi pembayaran, hitung total pengeluaran
├── models/                    # Definisi struktur tabel database (ORM/Skema)
│   ├── User.js
│   ├── Game.js
│   ├── Category.js
│   ├── Transaction.js
│   └── Library.js
├── public/                    # Aset statis untuk visualisasi web
│   ├── css/                   # Styling antarmuka (Steam-like dark theme)
│   ├── js/                    # Client-side scripting
│   └── uploads/               # Screenshot/cover game
├── routes/                    # Jalur URL (API/Web routing)
│   ├── api.js                 # Endpoint untuk query kompleks
│   └── web.js                 # Rute untuk halaman toko, library, keranjang
├── views/                     # Tampilan antarmuka (HTML/EJS/Blade)
│   ├── pages/
│   │   ├── store.ejs          # Halaman utama toko game
│   │   ├── cart.ejs           # Keranjang belanja & checkout
│   │   ├── library.ejs        # Pustaka game milik user
│   │   └── history.ejs        # Riwayat transaksi & pengeluaran
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
├── database/
│   ├── migrations/            # Script pembuatan tabel (ERD ke SQL)
│   └── seeders/               # Data awal (dummy game, kategori, & user)
├── .gitignore
├── README.md                  # Dokumentasi makalah & cara jalankan proyek
└── package.json               # Dependensi proyek
2. Git Issues (Product Backlog)
Anda bisa langsung menyalin (copy-paste) daftar di bawah ini ke fitur Issues di GitHub/GitLab Anda. Masalah (issues) ini dibagi berdasarkan komponen analisis yang Anda sebutkan agar mempermudah penyusunan makalah nanti.

🔴 Milestone 1: Database & Arsitektur Data (ERD Fundamental)
Issue #1: Perancangan Skema Database & Migrasi Tabel (ERD)
Deskripsi: Membuat skema database relasional berdasarkan ERD untuk entitas utama Users, Games, Categories, Transactions, dan tabel penghubung Library.

Tugas:

[ ] Buat file migrasi untuk tabel users (id, username, email, password, balance).

[ ] Buat tabel categories (id, name) dan games (id, title, developer, price, category_id).

[ ] Buat tabel transactions (id, user_id, total_price, payment_method, purchase_date).

[ ] Buat tabel penghubung library (id, user_id, game_game_id, playtime_hours, installation_status).

[ ] Jalankan seeder data dummy untuk minimal 10 game dan 3 user.

Label: database, enhancement

🟡 Milestone 2: Fitur Inti & Query Kompleks (Business Process)
Issue #2: Implementasi Fitur Store & Filter Game (Data Retrieval)
Deskripsi: Membangun endpoint dan logika untuk menampilkan daftar game di toko yang bisa dicari berdasarkan genre atau developer.

Tugas:

[ ] Buat query pencarian: SELECT * FROM games WHERE title LIKE %query% OR developer LIKE %query%.

[ ] Buat query filter berdasarkan category_id.

[ ] Hubungkan data ke tampilan halaman utama Toko (store.ejs).

Label: backend, query-complex

Issue #3: Sistem Transaksi & Validasi Pembayaran (Data Process & Input)
Deskripsi: Memproses pembelian game oleh user. Sistem harus memvalidasi saldo, mencatat transaksi, dan memasukkan game ke library pengguna secara otomatis.

Tugas:

[ ] Validasi apakah saldo user cukup untuk membeli game di keranjang.

[ ] Gunakan database transaction: jika saldo cukup, kurangi saldo user -> buat baris baru di transactions -> masukkan entri baru ke library.

[ ] Cegah pembelian ganda jika game sudah ada di library user.

Label: backend, security

Issue #4: Query Kompleks Statistik Library & Pengeluaran
Deskripsi: Membuat query analitik tingkat lanjut yang akan digunakan sebagai bahan pembuktian di bab pembahasan makalah.

Tugas:

[ ] Query 1: Menampilkan daftar game yang paling banyak dimainkan oleh user tertentu (Urut berdasarkan playtime_hours tertinggi).

[ ] Query 2: Menghitung total pengeluaran seorang user dalam rentang waktu tertentu (Menggunakan fungsi agregat SUM(total_price) dengan filter purchase_date antara tanggal X dan Y).

Label: backend, query-complex

🔵 Milestone 3: Antarmuka & Visualisasi (Frontend Demo)
Issue #5: Slicing UI Halaman Toko & Keranjang Belanja
Deskripsi: Membuat visualisasi antarmuka web bergaya gelap (dark theme) seperti Steam Store agar menarik saat di-screenshot untuk demo makalah.

Tugas:

[ ] Desain halaman katalog game dengan kartu produk (menampilkan judul, harga, badge genre).

[ ] Desain halaman keranjang belanja lengkap dengan tombol "Purchase".

Label: frontend, ui/ux

Issue #6: Slicing UI Library & Dashboard Playtime
Deskripsi: Membuat tampilan halaman pustaka game (library.ejs) milik pengguna.

Tugas:

[ ] Tampilkan daftar game yang sudah dibeli di sisi kiri (sidebar).

[ ] Tampilkan detail game yang dipilih di sisi kanan: total durasi bermain (playtime), status instalasi, dan tombol "Play".

Label: frontend, ui/ux
