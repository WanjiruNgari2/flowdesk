require('dotenv').config();
const { Pool } = require("pg");


// Only enable SSL when DATABASE_URL is defined and we're in production.
const poolConfig = {};
if (process.env.DATABASE_URL) {
  poolConfig.connectionString = process.env.DATABASE_URL;
} else if (process.env.PGHOST) {
  // the pg library will read PGUSER, PGPASSWORD, PGDATABASE, etc. automatically
  console.log('Using PG* environment variables for connection');
} else {
  console.error(
    'Database configuration missing.\n' +
    'Please set DATABASE_URL (preferred) or PGHOST/PGUSER/PGPASSWORD environment variables.\n' +
    'Local Postgres must be running and accessible.'
  );
  process.exit(1);
}

if (process.env.NODE_ENV === 'production' || process.env.DATABASE_URL?.includes('neon')) {
  poolConfig.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(poolConfig);

// Test the connection 
pool.on('connect', () => {
  console.log('Connected to Neon database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;

