const path = require('path');
const express = require('express');

const app = express();

// Serve static files from the '../../../build' directory of your React application
app.use(express.static(path.join(__dirname, '../client/build')));

// Route handler for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
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