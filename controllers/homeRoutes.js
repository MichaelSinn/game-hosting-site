const router = require('express').Router();
const Game = require("../models/Game");

const games = [
    {
        name: "Game 1",
        description: "Some game",
        link: "6"
    },
    {
        name: "Game 2",
        description: "Some game",
        link: "5"
    },
    {
        name: "Game 3",
        description: "Some game",
        link: "4"
    },
    {
        name: "Game 1",
        description: "Some game",
        link: "3"
    },
    {
        name: "Game 2",
        description: "Some game",
        link: "2"
    },
    {
        name: "Game 3",
        description: "Some game",
        id: "1"
    },
]

router.get('/', (req, res) => {
    res.render('homepage', {games});
});

router.get('/:game_id', async (req, res)=>{
    const gameData = await Game.findByPk(req.params.id);
    const game = gameData.get({plain: true});
    res.render("gamepage", game);
});

module.exports = router;