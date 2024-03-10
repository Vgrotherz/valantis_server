const path = require('path');
const express = require('express');

const app = express();

// Serve static files from the appropriate directory based on environment
if (process.env.NODE_ENV === 'production') {
  // Если в production, то будут раздаваться статические файлы из папки 'client/build'
  app.use(express.static(path.join(__dirname, '../client/build')));
} else {
  // В режиме разработки используем другую директорию, например 'client/public'
  app.use(express.static(path.join(__dirname, '../client/public')));
}

// Route handler for the root URL
app.get('/', (req, res) => {
  // Используем правильный путь к index.html в зависимости от окружения
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
  }
});

// Установим константу для URL API
const apiUrl = 'http://api.valantis.store:40000/';

app.get('/api-url', (req, res) => {
  res.json({ apiUrl });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});