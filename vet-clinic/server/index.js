const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./config/db');
const userRoutes = require('./routes/users');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, '../client/src/pages')));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});