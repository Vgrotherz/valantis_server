const path = require('path');
const express = require('express');
const cors = require('cors'); // Import the cors middleware

const app = express();

// Middleware для обработки CORS
app.use(cors()); // Enable CORS for all routes

// Serve static files from the appropriate directory based on environment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
} else {
  app.use(express.static(path.join(__dirname, '../client/public')));
}

// Добавляем обработчик для OPTIONS запросов
app.options('*', cors()); // Enable pre-flight for all routes

app.get('/', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
  }
});

const apiUrl = 'http://api.valantis.store:40000/';

app.get('/api-url', (req, res) => {
  res.json({ apiUrl }).status(200);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});