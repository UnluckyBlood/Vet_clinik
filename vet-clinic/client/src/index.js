const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const multer = require('multer');
const upload = multer({ 
    dest: path.join(__dirname, 'uploads/pets') 
});
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/src/pages')));
app.use('/uploads', express.static('uploads'));
// Роутеры
const userRoutes = require('./routes/users');
app.use('/api/auth', userRoutes); // Было: app.use('/api', userRoutes);

// Обработка 404
app.use((req, res) => {
    res.status(404).json({ error: "Эндпоинт не найден" }); // Всегда возвращаем JSON
});
module.exports = { upload };
// Запуск сервера
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});