const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const transactionController = require('../controllers/transactionController');
const libraryController = require('../controllers/libraryController');

// Halaman Toko Game (Store)
router.get('/', gameController.getStorePage);

// Halaman Keranjang Belanja & Checkout (Cart)
router.get('/cart', transactionController.getCartPage);

// Halaman Library Game milik User
router.get('/library', libraryController.getLibraryPage);

module.exports = router;
