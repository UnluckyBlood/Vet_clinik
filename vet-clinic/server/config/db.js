const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Nestea915',
    port: 5432,
});

// Проверка подключения
pool.query('SELECT NOW()', (err) => {
    if (err) {
        console.error('Ошибка подключения к PostgreSQL:', err);
    } else {
        console.log('PostgreSQL подключен успешно!');
    }
});

module.exports = pool;