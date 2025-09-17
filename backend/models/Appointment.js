const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Patient = require('./Patient');
const Dietitian = require('./Dietitian');

const Appointment = sequelize.define('Appointment', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  date: { type: DataTypes.DATE, allowNull: false },
  status: { 
    type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
    defaultValue: 'scheduled'
  },
  notes: { type: DataTypes.TEXT }
}, { timestamps: true });

Appointment.belongsTo(Patient, { foreignKey: 'patientId', onDelete: 'CASCADE' });
Appointment.belongsTo(Dietitian, { foreignKey: 'dietitianId', onDelete: 'CASCADE' });

module.exports = Appointment;
