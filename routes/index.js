const express = require('express');
const router = express.Router();
const film = require('../controllers/film.controller');

router.get('/film', film.getAll);

module.exports = router;
