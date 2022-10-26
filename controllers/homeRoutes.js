const router = require('express').Router();
const Game = require("../models/Game");

router.get('/', async (req, res) => {
    const gamesData = await Game.findAll();
    const games = gamesData.map(game => game.get({plain: true}));
    res.render('homepage', {games});
});

module.exports = router;