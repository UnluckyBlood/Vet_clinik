const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/src/pages')));

// Роутеры
const userRoutes = require('./routes/users');
app.use('/api', userRoutes);

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});