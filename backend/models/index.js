const { sequelize } = require('../config/database');
const User = require('./User');
const Dietitian = require('./Dietitian');
const Patient = require('./Patient');
const Food = require('./Food');
const DietPlan = require('./DietPlan');
const Appointment = require('./Appointment');
const Payment = require('./Payment');

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    await sequelize.sync({ alter: true });
    console.log('✅ Models synchronized');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Dietitian,
  Patient,
  Food,
  DietPlan,
  Appointment,
  Payment,
  connectDB
};
