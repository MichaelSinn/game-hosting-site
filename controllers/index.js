const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const gameRoutes = require('./game');
const userRoutes = require('./user');
const leaderboardRoutes = require('./leaderboard/leaderboardRoutes')

router.use('/', homeRoutes);
router.use('/game', gameRoutes);
router.use('/user', userRoutes);
router.use('/leaderboard', leaderboardRoutes);

module.exports = router;