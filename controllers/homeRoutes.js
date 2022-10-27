const router = require('express').Router();
const Game = require("../models/Game");

router.get('/', async (req, res) => {
    const gamesData = await Game.findAll();
    const games = gamesData.map(game => game.get({plain: true}));
    res.render('homepage', {games, logged_in: req.session.logged_in});
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) =>{
    if (req.session.logged_in){
        res.redirect('/');
        return;
    }

    res.render('signup');
})

module.exports = router;