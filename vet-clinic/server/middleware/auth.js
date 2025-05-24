const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Требуется авторизация' });
  // Проверка токена (реализуйте JWT)
  next();
};

module.exports = auth;