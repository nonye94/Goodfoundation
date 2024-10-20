const { Pool } = require('pg');
const config = {
  user: 'postgres',
  password: 'Ch1j10ke',
  host: 'localhost',
  port: '5432',
  database: 'GoodFoundation',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
};

const pool = new Pool(config);


module.exports = pool;