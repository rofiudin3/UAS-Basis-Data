a. Deskripsi Umum Produk Digital
VaporVault adalah sebuah platform digital berbasis web yang berfungsi sebagai sistem manajemen pustaka (library) game dan platform pembelian game digital. Terinspirasi dari distribusi game modern seperti Steam, VaporVault dirancang untuk menjembatani hubungan antara pemain (users) dan penyedia game. Platform ini memfasilitasi pengguna untuk menjelajahi katalog game, melakukan transaksi pembelian secara aman dengan saldo digital, serta mengelola koleksi game yang telah dimiliki, termasuk memantau durasi bermain (playtime hours) secara personal.

2.b. Deskripsi Spesifik Fitur & Aliran Data
1. Fitur Store & Katalog Game
Business Process: Pengguna membuka halaman toko, menjelajahi berbagai pilihan game, dan menyaring (filter) game berdasarkan kategori/genre atau pengembang (developer).

Data Input: Kata kunci pencarian (search query), pilihan filter kategori.

Data Diproses: Pencocokan string teks pencarian dengan database game menggunakan query LIKE atau pencocokan ID kategori.

Data Diretrieve: Daftar game yang sesuai dengan pencarian/filter (menampilkan judul, harga, genre, dan developer).

Rencana Screenshot: (Ambil screenshot halaman utama web VaporVault Anda yang menampilkan grid/kartu produk game).

2. Fitur Transaksi Pembelian (Checkout)
Business Process: Pengguna memasukkan game ke keranjang belanja dan melakukan checkout. Sistem memeriksa kecukupan saldo pengguna, memotong saldo, mencatat riwayat transaksi, dan mengirimkan game ke pustaka digital pengguna.

Data Input: ID User, ID Game, Metode Pembayaran.

Data Diproses: Validasi kecukupan saldo (Saldo >= Harga Game), pengurangan saldo user, dan pencegahan pembelian ganda jika game sudah dimiliki.

Data Diretrieve: Status transaksi (Berhasil/Gagal), sisa saldo terbaru, dan invoice riwayat pembelian.

Rencana Screenshot: (Ambil screenshot halaman keranjang belanja/cart saat menekan tombol "Purchase" atau halaman sukses transaksi).

3. Fitur Pustaka Game (Library & Playtime)
Business Process: Pengguna melihat seluruh daftar game yang telah dibeli, memeriksa status instalasi, dan melihat akumulasi durasi bermain (playtime) dari game tersebut.

Data Input: ID User (saat login/sesi aktif).

Data Diproses: Perhitungan total waktu bermain dan verifikasi hak kepemilikan game.

Data Diretrieve: Daftar game milik pengguna, status instalasi, durasi bermain masing-masing game, dan statistik game yang paling sering dimainkan.

Rencana Screenshot: (Ambil screenshot halaman Library user yang menampilkan daftar game di sidebar kiri dan detail playtime di sebelah kanan).
