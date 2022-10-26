const router = require('express').Router();
const Game = require("../models/Game");

const games = [
    {
        name: "Game 1",
        description: "Some game",
        id: "6"
    },
    {
        name: "Game 2",
        description: "Some game",
        id: "5"
    },
    {
        name: "Game 3",
        description: "Some game",
        id: "4"
    },
    {
        name: "Game 1",
        description: "Some game",
        id: "3"
    },
    {
        name: "Game 2",
        description: "Some game",
        id: "2"
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

module.exports = router;