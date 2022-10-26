const User = require('./User')
const Scores = require('./Scores')
const Game = require('./Game')

User.hasMany(Scores, {
    foreignKey: 'user_id',
});

Scores.belongsTo(User, {
    foreignKey: 'user_id'
});

Game.hasMany(Scores, {
    foreignKey: 'game_id'
});

Scores.belongsTo(Game, {
    foreignKey: 'game_id'
});

module.exports = {User, Scores, Game};