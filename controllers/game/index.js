const router = require('express').Router();
const gameRoutes = require('./gameRoutes');


router.use('/', gameRoutes);

module.exports = router;