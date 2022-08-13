const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pet extends Model { }

Pet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pet_type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1] //at least one characters long
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gender: {
            type: DataTypes.CHAR,
            validate: {
                isIn: [['M', 'F']]//validate to only accept M or F as response
            }
        },
        picture_url: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'pet'
    }
);

module.exports = Pet;