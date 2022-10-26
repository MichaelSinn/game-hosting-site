const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const gameRoutes = require('./game');

router.use('/', homeRoutes);
router.use('/game', gameRoutes);

module.exports = router;