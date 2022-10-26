const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const gameRoutes = require('./game');
const userRoutes = require('./user');

router.use('/', homeRoutes);
router.use('/game', gameRoutes);
router.use('/user', userRoutes);

module.exports = router;