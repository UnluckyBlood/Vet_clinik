const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const upload = require('./config/upload');
const fs = require('fs');

// Создание папок при запуске
const createDirectories = () => {
    const directories = [
        path.join(__dirname, 'uploads'),
        path.join(__dirname, 'uploads/pdf')
    ];

    directories.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`Создана директория: ${dir}`);
        }
    });
};
// Создаем папки при запуске
const uploadsDir = path.join(__dirname, 'uploads/pets');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/src/pages')));
app.use('/uploads', express.static('uploads'));

// Роутеры
const userRoutes = require('./routes/users');
app.use('/api', userRoutes);

// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});