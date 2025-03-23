const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',         // Имя пользователя в PostgreSQL
    host: 'localhost',        // Сервер базы данных (оставь localhost, если локально)
    database: 'vet_db',       // Название БД (проверь в pgAdmin)
    password: 'yourpassword', // Пароль пользователя PostgreSQL
    port: 5432,               // Порт (обычно 5432)
});

module.exports = pool;
