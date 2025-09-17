const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Dietitian = sequelize.define('Dietitian', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  specialization: { type: DataTypes.STRING, allowNull: false },
  experience: { type: DataTypes.INTEGER, allowNull: false },
  licenseNumber: { type: DataTypes.STRING, unique: true },
  phone: { type: DataTypes.STRING },
  clinicAddress: { type: DataTypes.TEXT }
}, { timestamps: true });

User.hasOne(Dietitian, { foreignKey: 'userId', onDelete: 'CASCADE' });
Dietitian.belongsTo(User, { foreignKey: 'userId' });

module.exports = Dietitian;
