const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Food = sequelize.define('Food', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING },
  calories: { type: DataTypes.FLOAT },
  protein: { type: DataTypes.FLOAT },
  carbs: { type: DataTypes.FLOAT },
  fat: { type: DataTypes.FLOAT },
  ayurvedicProperties: { type: DataTypes.TEXT }
}, { timestamps: true });

module.exports = Food;
