const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const Score = require('./Scores');

class Game extends Model {
}

Game.init(
  {
	  id: {
		  type: DataTypes.INTEGER,
		  allowNull: false,
		  primaryKey: true,
		  autoIncrement: true,
	  },
	  name: {
		  type: DataTypes.STRING,
		  allowNull: false,
	  },
	  script: {
		  type: DataTypes.STRING,
		  allowNull: false
	  },
	  hero_image: {
		  type: DataTypes.STRING,
		  allowNull: false,
		  defaultValue: 'coming-soon.jpg'
	  },
	  instructions: {
		  type: DataTypes.TEXT,
		  allowNull: false,
		  defaultValue: 'Coming Soon'
	  }
  },
  {
	  sequelize,
	  timestamps: false,
	  freezeTableName: true,
	  underscored: true,
	  modelName: 'game',
  }
);

module.exports = Game;