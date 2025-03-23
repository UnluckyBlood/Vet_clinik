const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // Подключение к PostgreSQL
const router = express.Router();

require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

// 📌 Регистрация
router.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
            [username, email, hashedPassword, role]
        );
        res.json({ message: "Регистрация успешна!" });
    } catch (err) {
        res.status(400).json({ message: "Ошибка при регистрации" });
    }
});

// 📌 Вход
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "Неверный email" });

        const valid = await bcrypt.compare(password, user.rows[0].password);
        if (!valid) return res.status(401).json({ error: "Неверный пароль" });

        const token = jwt.sign({ id: user.rows[0].id, role: user.rows[0].role }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ token, user: user.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
