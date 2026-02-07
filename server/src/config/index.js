
const path = require('path');
const dotenv = require('dotenv');

// Prevent double-loading if already initialized
if (!process.env.DB_USERNAME) {
  const env = process.env.APP_ENV || 'staging';
  const envPath = path.resolve(process.cwd(), `.env.${env}`);
  
  dotenv.config({ path: envPath });
  
  // LOG HERE to verify immediately
  console.log(`📍 Config Layer Check: DB_USER is ${process.env.DB_USERNAME}`);
  console.log('Loaded .env file, SESSION_SECRET =', process.env.SESSION_SECRET);
}

module.exports = process.env;

