const router = require('express').Router();
const Game = require('../../models/Game');
const Scores = require('../../models/Scores');
const User = require('../../models/User');
const withAuth = require('../../util/auth');

router.get('/:game_id', withAuth, async (req, res) => {

	const gameData = await Game.findByPk(req.params.game_id);
	const scoreData = await Scores.findAll({
		where: {
			game_id: req.params.game_id,
		},
		include: [{model: User}],
		order: [['score', 'DESC']],
		limit: 5,
	});
	const scores = scoreData.map((score) => score.get({plain: true}));
	const game = gameData.get({plain: true});
	res.render('gamepage', {game, logged_in: req.session.logged_in, scores});
});

router.post('/:game_id', withAuth, async (req, res) => {
	console.log(req.params.game_id);
	const scoreData = await Scores.create({
		score: req.body.score,
		user_id: req.session.user_id,
		game_id: req.params.game_id,
	});
	console.log(scoreData);
	res.status(200).json(scoreData);
});

module.exports = router;