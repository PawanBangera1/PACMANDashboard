const express = require('express');
const dashboardRoutes = require('./routes/index');
require('dotenv').config();
const corsMiddleware = require('./middleware/cors');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(corsMiddleware);

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});