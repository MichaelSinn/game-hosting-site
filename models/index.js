const User = require('./User')
const Scores = require('./Scores')
const Game = require('./Game')

User.hasMany(Scores, {
    foreignKey: 'user_id',
})

Scores.belongsTo(User, {
    foreignKey: 'user_id'
})

Game.hasMany(Scores, {
    foreignKey: 'score_id'
})

Scores.belongsTo(Game, {
    foreignKey: 'score_id'
})