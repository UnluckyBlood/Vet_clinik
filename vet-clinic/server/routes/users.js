const express = require('express');
const router = express.Router(); // Добавьте эту строку
const pool = require('../config/db');

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

        // Для владельцев: сохраняем питомца
        if (role === 'pet_owner' && petData) {
            if (
                !petData.petName || 
                !petData.petAge || 
                !petData.petBreed || 
                !petData.petGender || 
                !petData.petType
            ) {
                throw new Error("Не все данные питомца заполнены");
            }

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
module.exports = router; // Экспорт роутера