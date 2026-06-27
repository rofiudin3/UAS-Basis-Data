const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const transactionController = require('../controllers/transactionController');
const libraryController = require('../controllers/libraryController');

// API list game (mengembalikan JSON)
router.get('/games', gameController.getGamesApi);

// API untuk memproses transaksi pembelian game
router.post('/purchase', transactionController.processPurchase);

// API untuk merubah status instalasi game
router.post('/library/status', libraryController.updateStatus);

// API untuk mensimulasikan bermain game (menambah playtime)
router.post('/library/play', libraryController.simulatePlaytime);

module.exports = router;
