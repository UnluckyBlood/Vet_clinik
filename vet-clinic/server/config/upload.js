const path = require('path');
const multer = require('multer');

// Конфигурация хранилища для разных типов файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, path.join(__dirname, '../uploads/pdf'));
        } else {
            cb(null, path.join(__dirname, '../uploads/pets'));
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Недопустимый формат файла'));
        }
    }
});

module.exports = upload;