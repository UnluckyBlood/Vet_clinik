const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
