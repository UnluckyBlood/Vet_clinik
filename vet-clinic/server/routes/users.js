const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Регистрация
router.post('/register', async (req, res) => {
    const { name, email, phone, role, password, petData, licenseData } = req.body;

    try {
        // Проверка уникальности email
        const emailCheck = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ error: "Email уже используется" });
        }

        // Сохранение пользователя
        const userResult = await pool.query(
            `INSERT INTO users 
            (name, email, phone, role, password, approved) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING id`,
            [name, email, phone, role, password, role === 'vet' ? false : true]
        );

        // Для ветеринаров
        if (role === 'vet' && licenseData) {
            await pool.query(
                `INSERT INTO vet_licenses 
                (user_id, license_number, issue_date, issued_by) 
                VALUES ($1, $2, $3, $4)`,
                [
                    userResult.rows[0].id,
                    licenseData.licenseNumber,
                    licenseData.issueDate,
                    licenseData.issuedBy
                ]
            );
        }

        // Для владельцев
        if (role === 'pet_owner' && petData) {
            await pool.query(
                `INSERT INTO pets 
                (owner_id, name, age, breed, gender, type) 
                VALUES ($1, $2, $3, $4, $5, $6)`,
                [
                    userResult.rows[0].id,
                    petData.petName,
                    petData.petAge,
                    petData.petBreed,
                    petData.petGender,
                    petData.petType
                ]
            );
        }

        res.status(201).json({ success: true });
    } catch (err) {
        console.error("Ошибка регистрации:", err);
        res.status(500).json({ error: err.message || "Ошибка регистрации" });
    }
});

// Авторизация
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await pool.query(
            `SELECT id, role, approved FROM users 
            WHERE email = $1 AND password = $2`,
            [email.toLowerCase(), password]
        );

        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: "Неверный email или пароль" });
        }

        const user = userResult.rows[0];
        
        if (user.role === 'vet' && !user.approved) {
            return res.status(403).json({ 
                error: "Аккаунт ожидает подтверждения" 
            });
        }

        res.json({ id: user.id, role: user.role });
    } catch (err) {
        console.error("Ошибка входа:", err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

// Получение неподтвержденных ветеринаров
router.get('/unapproved-vets', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT u.id, u.name, u.email, u.phone, 
                    v.license_number, v.issue_date, v.issued_by 
             FROM users u
             INNER JOIN vet_licenses v ON u.id = v.user_id
             WHERE u.role = 'vet' AND u.approved = false`
        );
        res.json(result.rows);
    } catch (err) {
        console.error("Ошибка получения списка:", err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

// Получение данных ветеринара по ID
router.get('/vet/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `SELECT u.id, u.name, u.email, u.phone, 
                    v.license_number, v.issue_date, v.issued_by 
             FROM users u
             INNER JOIN vet_licenses v ON u.id = v.user_id
             WHERE u.id = $1`,
            [id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Ошибка получения данных:", err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

// Одобрение ветеринара
router.post('/approve-vet/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `UPDATE users SET approved = true 
             WHERE id = $1 RETURNING id`,
            [id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Ветеринар не найден" });
        }
        
        res.json({ success: true });
    } catch (err) {
        console.error("Ошибка одобрения:", err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

// Отклонение ветеринара
router.post('/reject-vet/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('BEGIN');
        await pool.query(`DELETE FROM vet_licenses WHERE user_id = $1`, [id]);
        await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
        await pool.query('COMMIT');
        res.json({ success: true });
    } catch (err) {
        await pool.query('ROLLBACK');
        console.error("Ошибка отклонения:", err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

// Получение данных пользователя
router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query(
            `SELECT id, name, email, phone, role 
             FROM users 
             WHERE id = $1`,
            [id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Ошибка получения данных:", err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

// Обновление данных пользователя
router.put('/update-user/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    try {
        const emailCheck = await pool.query(
            "SELECT * FROM users WHERE email = $1 AND id != $2",
            [email, id]
        );
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ error: "Email уже используется" });
        }

        const userResult = await pool.query(
            `UPDATE users 
             SET name = $1, email = $2, phone = $3 
             WHERE id = $4 
             RETURNING *`,
            [name, email, phone, id]
        );

        res.json({ success: true, user: userResult.rows[0] });
    } catch (err) {
        console.error("Ошибка обновления:", err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

router.put('/update-vet/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password, licenseData, licenseChanged } = req.body;

    try {
        await pool.query('BEGIN');
        
        // Обновление пользователя
        await pool.query(`
            UPDATE users SET 
                name = COALESCE($1, name),
                email = COALESCE($2, email),
                password = COALESCE($3, password)
            WHERE id = $4
        `, [name, email, password, id]);

        // Обновление лицензии
        if (licenseData) {
            await pool.query(`
                UPDATE vet_licenses SET
                    license_number = COALESCE($1, license_number),
                    issue_date = COALESCE($2, issue_date),
                    issued_by = COALESCE($3, issued_by)
                WHERE user_id = $4
            `, [licenseData.licenseNumber, licenseData.issueDate, licenseData.issuedBy, id]);
        }

        // Сброс approved при изменении лицензии
        if (licenseChanged) {
            await pool.query(`UPDATE users SET approved = false WHERE id = $1`, [id]);
        }

        await pool.query('COMMIT');
        res.json({ success: true });

    } catch (err) {
        await pool.query('ROLLBACK');
        console.error("Ошибка обновления:", err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

module.exports = router;