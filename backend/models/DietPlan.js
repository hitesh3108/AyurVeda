const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Patient = require('./Patient');
const Dietitian = require('./Dietitian');

const DietPlan = sequelize.define('DietPlan', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  startDate: { type: DataTypes.DATE },
  endDate: { type: DataTypes.DATE }
}, { timestamps: true });

DietPlan.belongsTo(Patient, { foreignKey: 'patientId', onDelete: 'CASCADE' });
DietPlan.belongsTo(Dietitian, { foreignKey: 'dietitianId', onDelete: 'SET NULL' });

module.exports = DietPlan;
