const router = require('express').Router();
const Game = require('../models/Game');
const Scores = require('../models/Scores');
const sequelize = require('../config/connection');
const {Sequelize} = require('sequelize');
const featuredGameTitles = ['Pop the Pig', 'Snake Game', 'Timmy Game'];

router.get('/', async (req, res) => {
	const gamesData = await Game.findAll();
	const allGames = gamesData.map(game => game.get({plain: true}));
	const games = allGames.filter(game => featuredGameTitles.includes(game.name));
	res.render('homepage', {games, logged_in: req.session.logged_in});
});

router.get('/games', async (req, res) => {
	const gamesData = await Game.findAll();
	const games = gamesData.map(game => game.get({plain: true}));
	res.render('games', {games, logged_in: req.session.logged_in});
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

router.get('/leaderboard', async (req, res) => {
	const gameIdsData = await Scores.findAll({
		include: [{model: Game}],
		group: 'game_id'
	});
	const gameIds = gameIdsData.map(gameId => {
		const id = gameId.get({plain: true}).game_id;
		const game = gameId.game.get({plain: true}).name;
		return {id, game};
	}); // Gets all game IDs and their names
	let gameScoreQuery = '';
	gameIds.forEach((gameId, index) => {
		gameScoreQuery += `(SELECT score, game_id, u2.name as player FROM score s JOIN user u2 on s.user_id = u2.id WHERE game_id = ${gameId.id} ORDER BY score DESC LIMIT 5)`;
		if (index < gameIds.length - 1) {
			gameScoreQuery += ' UNION ';
		}
	});

	const fullQuery = `SELECT u.*
                       FROM (${gameScoreQuery}) as u;`;

	const scores = await sequelize.query(fullQuery, {type: Sequelize.QueryTypes.SELECT});
	res.render('leaderboard', {logged_in: req.session.logged_in, gameIds, scores});
})
;

module.exports = router;