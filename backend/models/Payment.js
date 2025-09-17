const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Appointment = require('./Appointment');

const Payment = sequelize.define('Payment', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  currency: { type: DataTypes.STRING, defaultValue: 'INR' },
  status: { 
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending'
  },
  provider: { type: DataTypes.ENUM('stripe', 'razorpay') },
  transactionId: { type: DataTypes.STRING, unique: true }
}, { timestamps: true });

Payment.belongsTo(Appointment, { foreignKey: 'appointmentId', onDelete: 'SET NULL' });

module.exports = Payment;
