const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Scores extends Model {}

Scores.init (
                {
            id: {
                    type: DataTypes.INTERGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
            },
            score: {
                    type: DataTypes.INTERGER,
                    allowNull: false,
            },
            user_id: {
                    type: DataTypes.INTERGER,
                    references: {
                            model: 'User',
                            key: 'id',
                    }
            },

                },
    {
            sequelize,
            timestamps: false,
            freezeTableName: true,
            underscored: true,
            modelName: 'user',
    }
)

module.exports = Scores