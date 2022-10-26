const sequelize = require('../config/connection');
const { Game } = require('../models');

const gameData = require('./gameData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Game.bulkCreate(gameData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();