const sequelize = require('../config/connection');
const { Game } = require('../models');
const { User } = require('../models')
const { Scores } = require('../models')


const gameData = require('./gameData.json');
const userData = require('./userData.json');
const scoresData = require('./scoresData.json')

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Game.bulkCreate(gameData, {
        individualHooks: true,
        returning: true,
    });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    })

    await Scores.bulkCreate(scoresData, {
        individualHooks: true,
        returning: true,
    })

    process.exit(0);
};

seedDatabase();