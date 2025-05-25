const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const upload = require('../config/upload');
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
router.post('/add-pet', upload.single('photo'), async (req, res) => {
    const { owner_id, name, age, breed, gender, type } = req.body;
    const photo = req.file ? `/uploads/pets/${req.file.filename}` : 'default.jpg';

    try {
        const result = await pool.query(
            `INSERT INTO pets 
            (owner_id, name, age, breed, gender, type, photo_url) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *`,
            [owner_id, name, age, breed, gender, type, photo]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Получение всех питомцев пользователя
router.get('/pets/:owner_id', async (req, res) => {
    try {
        console.log('Fetching pets for owner:', req.params.owner_id);
        const result = await pool.query(
            `SELECT id, name, photo_url, age, breed 
             FROM pets WHERE owner_id = $1`,
            [req.params.owner_id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Получение данных конкретного питомца
router.get('/pet/:pet_id', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM pets WHERE id = $1`,
            [req.params.pet_id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.put('/pet/:pet_id', upload.single('photo'), async (req, res) => {
    const { pet_id } = req.params;
    const { name, breed, gender, age, passport } = req.body;
    
    try {
        let photo_url;
        if (req.file) {
            photo_url = `/uploads/pets/${req.file.filename}`;
        } else {
            // Сохраняем существующее фото
            const currentPhoto = await pool.query(
                'SELECT photo_url FROM pets WHERE id = $1', 
                [pet_id]
            );
            photo_url = currentPhoto.rows[0].photo_url;
        }

        await pool.query(
            `UPDATE pets SET 
                name = COALESCE($1, name),
                breed = COALESCE($2, breed),
                gender = COALESCE($3, gender),
                age = COALESCE($4, age),
                passport = COALESCE($5, passport),
                photo_url = COALESCE($6, photo_url)
             WHERE id = $7`,
            [name, breed, gender, age, passport, photo_url, pet_id]
        );
        
        res.json({ success: true });
    } catch (err) {
        console.error("Ошибка обновления:", err);
        res.status(500).json({ error: err.message });
    }
});
// Добавление пациента ветеринару
router.post('/add-patient', async (req, res) => {
    const { vet_id, pet_id } = req.body;
    
    try {
        // Проверяем существование питомца
        const petCheck = await pool.query(
            'SELECT * FROM pets WHERE id = $1',
            [pet_id]
        );
        
        if (petCheck.rows.length === 0) {
            return res.status(404).json({ error: "Питомец не найден" });
        }

        // Добавляем связь
        await pool.query(
            'INSERT INTO vet_patients (vet_id, pet_id) VALUES ($1, $2)',
            [vet_id, pet_id]
        );
        
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Получение пациентов ветеринара
router.get('/vet-patients/:vet_id', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT p.id, p.name, p.photo_url 
            FROM vet_patients vp
            JOIN pets p ON vp.pet_id = p.id
            WHERE vp.vet_id = $1
        `, [req.params.vet_id]);
        
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.delete('/vet-patients/:vet_id/:pet_id', async (req, res) => {
    const { vet_id, pet_id } = req.params;
    
    try {
        await pool.query(
            `DELETE FROM vet_patients 
             WHERE vet_id = $1 AND pet_id = $2`,
            [vet_id, pet_id]
        );
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.post('/appointments', upload.single('pdf'), async (req, res) => {
    try {
        // Преобразование и валидация ID
        const pet_id = parseInt(req.body.pet_id);
        const vet_id = parseInt(req.body.vet_id);

        if (isNaN(pet_id) || isNaN(vet_id)) {
            return res.status(400).json({ error: "Некорректные идентификаторы" });
        }

        // Проверка существования записей
        const petCheck = await pool.query('SELECT * FROM pets WHERE id = $1', [pet_id]);
        const vetCheck = await pool.query('SELECT * FROM users WHERE id = $1 AND role = $2', [vet_id, 'vet']);

        if (petCheck.rows.length === 0 || vetCheck.rows.length === 0) {
            return res.status(404).json({ error: "Питомец или ветеринар не найдены" });
        }

        // Формирование данных
        const { type, address, date, ...details } = req.body;
        const pdfPath = req.file ? `/uploads/pdf/${req.file.filename}` : null;

        // SQL-запрос
        const result = await pool.query(
            `INSERT INTO appointments 
            (pet_id, vet_id, type, address, date, details, pdf_path) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *`,
            [pet_id, vet_id, type, address, date, JSON.stringify(details), pdfPath]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {
        console.error("Ошибка создания записи:", err.message);
        res.status(500).json({ 
            error: "Внутренняя ошибка сервера",
            details: err.message 
        });
    }
});
// Получение приёмов по pet_id
router.get('/appointments/:pet_id', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM appointments 
             WHERE pet_id = $1 
             ORDER BY date DESC, created_at DESC`,
            [req.params.pet_id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Получение данных пользователя по ID
router.get('/user/:id', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, name, email, phone, role 
             FROM users 
             WHERE id = $1`,
            [req.params.id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Пользователь не найден" });
        }
        
        res.json(result.rows[0]);
        
    } catch (err) {
        console.error("Ошибка получения данных:", err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});
router.get('/pet/:pet_id', async (req, res) => {
    try {
        const petId = parseInt(req.params.pet_id);
        if (isNaN(petId)) return res.status(400).json({ error: "Некорректный ID питомца" });

        const result = await pool.query('SELECT * FROM pets WHERE id = $1', [petId]);
        if (result.rows.length === 0) return res.status(404).json({ error: "Питомец не найден" });
        
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Получение записей
router.get('/appointments/:pet_id', async (req, res) => {
    try {
        const petId = parseInt(req.params.pet_id);
        if (isNaN(petId)) return res.status(400).json({ error: "Некорректный ID питомца" });

        const result = await pool.query(
            `SELECT * FROM appointments 
             WHERE pet_id = $1 
             ORDER BY date DESC`,
            [petId]
        );
        
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;