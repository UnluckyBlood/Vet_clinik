const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'vetclinik',
    password: '07052004',
    port: 5432,
});

module.exports = pool;

