const router = require('express').Router();
const Game = require("../../models/Game");
const Scores = require('../../models/Scores');

router.get('/:game_id', async (req, res)=>{

        const gameData = await Game.findByPk(req.params.game_id);
        const scoreData = await Scores.findAll({
            where: {
                game_id: req.params.game_id,
            },
            limit: 5,
            order: [ ['score', 'DESC']]
        });
    const scores = scoreData.map((score) => score.get({plain: true}));
    const game = gameData.get({plain: true});
    console.log(game)
    res.render("gamepage", {game, logged_in: req.session.logged_in, scores});
});

router.post('/:game_id', async (req,res) => {
    const scoreData = await Scores.create({
        order: ['score'],
        score: req.body.score,
        user_id: req.session.user_id,
        game_id: req.params.game_id,
    });
    res.status(200).json(scoreData)
});

module.exports = router;