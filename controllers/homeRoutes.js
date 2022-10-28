const router = require('express').Router();
const Game = require("../models/Game");
const Scores = require("../models/Scores");
const User = require("../models/User");

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

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

// TODO: Optimize
router.get('/leaderboard', async (req, res) => {
    const scoreData1 = await Scores.findAll({
        limit: 10,
        where: {
            game_id: 1
        },
        include: [{model: User}],
        order: [['score', 'DESC']],
    });
    const scoreData2 = await Scores.findAll({
        limit: 10,
        where: {
            game_id: 2
        },
        include: [{model: User}],
        order: [['score', 'DESC']],
    });
    const scoreData3 = await Scores.findAll({
        limit: 10,
        where: {
            game_id: 3
        },
        include: [{model: User}],
        order: [['score', 'DESC']],
    });
    const scoreData4 = await Scores.findAll({
        limit: 10,
        where: {
            game_id: 4
        },
        include: [{model: User}],
        order: [['score', 'DESC']],
    });
    const scoreData5 = await Scores.findAll({
        limit: 10,
        where: {
            game_id: 5
        },
        include: [{model: User}],
        order: [['score', 'DESC']],
    });
    const scoreData6 = await Scores.findAll({
        limit: 10,
        where: {
            game_id: 6
        },
        include: [{model: User}],
        order: [['score', 'DESC']],
    });
    const scores1 = scoreData1.map((score) => score.get({plain: true}));
    const scores2 = scoreData2.map((score) => score.get({plain: true}));
    const scores3 = scoreData3.map((score) => score.get({plain: true}));
    const scores4 = scoreData4.map((score) => score.get({plain: true}));
    const scores5 = scoreData5.map((score) => score.get({plain: true}));
    const scores6 = scoreData6.map((score) => score.get({plain: true}));

    res.render("leaderboard", {logged_in: req.session.logged_in, scores1, scores2, scores3, scores4, scores5, scores6});
});

module.exports = router;