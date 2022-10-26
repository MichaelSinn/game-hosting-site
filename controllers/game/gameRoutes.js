const router = require('express').Router();
const Game = require("../../models/Game");

router.get('/:game_id', async (req, res)=>{
    const gameData = await Game.findByPk(req.params.game_id);
    const game = gameData.get({plain: true});
    res.render("gamepage", game);
});

module.exports = router;