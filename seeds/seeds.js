const sequelize = require('../config/connection');
const { Game, User } = require('../models');

const gameData = require('./gameData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Game.bulkCreate(gameData, {
        individualHooks: true,
        returning: true,
    });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    process.exit(0);
};

seedDatabase();