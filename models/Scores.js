const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Game = require('./Game');

class Scores extends Model {
}

Scores.init(
  {
	  id: {
		  type: DataTypes.INTEGER,
		  allowNull: false,
		  primaryKey: true,
		  autoIncrement: true,
	  },
	  score: {
		  type: DataTypes.INTEGER,
		  allowNull: false,
	  },
	  user_id: {
		  type: DataTypes.INTEGER,
		  references: {
			  model: User,
			  key: 'id',
		  }
	  },
	  game_id: {
		  type: DataTypes.INTEGER,
		  references: {
			  model: Game,
			  key: 'id'
		  }
	  }
  },
  {
	  sequelize,
	  timestamps: false,
	  freezeTableName: true,
	  underscored: true,
	  modelName: 'score',
  }
);

module.exports = Scores;