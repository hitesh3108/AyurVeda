const fs = require('fs');
const path = require('path');

// --- File structure definition ---
const files = {
  'package.json': `{
  "name": "ayurveda-practice-backend",
  "version": "1.0.0",
  "description": "Backend API for Ayurvedic Practice Management & Nutrient Analysis Software",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "migrate": "npx sequelize-cli db:migrate",
    "seed": "npx sequelize-cli db:seed:all",
    "test": "jest"
  },
  "keywords": ["ayurveda", "nutrition", "healthcare", "api"],
  "author": "Your Name",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "sequelize": "^6.35.2",
    "pg": "^8.11.3",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "winston": "^3.11.0",
    "joi": "^17.11.0",
    "dotenv": "^16.3.1",
    "stripe": "^14.7.0",
    "razorpay": "^2.9.2",
    "express-rate-limit": "^7.1.5",
    "express-validator": "^7.0.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "sequelize-cli": "^6.6.2",
    "jest": "^29.7.0",
    "supertest": "^6.3.3"
  }
}`,

  '.env.example': `NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ayurveda_practice
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_URL=postgresql://your_db_user:your_db_password@localhost:5432/ayurveda_practice

JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

FRONTEND_URL=http://localhost:3000`,

  'server.js': `require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { sequelize } = require('./config/database');
const logger = require('./config/logger');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth');
const dietitianRoutes = require('./routes/dietitians');
const patientRoutes = require('./routes/patients');
const foodRoutes = require('./routes/foods');
const dietPlanRoutes = require('./routes/dietPlans');
const appointmentRoutes = require('./routes/appointments');
const paymentRoutes = require('./routes/payments');

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req, res, next) => {
  logger.info(\`\${req.method} \${req.originalUrl} - \${req.ip}\`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/dietitians', dietitianRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/dietplans', dietPlanRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
});

app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connected successfully');
    await sequelize.sync({ alter: true });
    logger.info('Database synchronized');

    app.listen(PORT, () => {
      logger.info(\`Server running on port \${PORT} in \${process.env.NODE_ENV} mode\`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;`,

  'config/database.js': `const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL || {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: { max: 10, min: 0, acquire: 30000, idle: 10000 }
});
module.exports = { sequelize };`,

  'config/logger.js': `const winston = require('winston');
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'ayurveda-backend' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}
module.exports = logger;`,

  'models/User.js': `// --- full content from your User.js ---`,
  'models/Dietitian.js': `// --- full content from your Dietitian.js ---`,
  'models/Patient.js': `// --- full content from your Patient.js ---`,
  'models/Appointment.js': `// --- full content from your Appointment.js ---`,
  'models/DietPlan.js': `// --- full content from your DietPlan.js ---`,
  'models/Food.js': `// --- full content from your Food.js ---`,
  'models/Payment.js': `// --- if you have Payment.js code ---`,
  'models/index.js': `// --- full content from your index.js ---`,

  'middleware/errorHandler.js': `module.exports = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
};`
};

// --- Create files and folders ---
for (const [filePath, content] of Object.entries(files)) {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n');
}

console.log('✅ Project structure created successfully!');
