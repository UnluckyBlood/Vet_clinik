const path = require('path');
const multer = require('multer');

// Настройка сохранения файлов
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/pets')); // Абсолютный путь
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Уникальное имя
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Лимит 5MB
});

module.exports = upload;