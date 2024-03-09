const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

// Use the cors middleware to allow requests from all origins
app.use(cors());

// Serve static files from the '../../../build' directory of your React application
app.use(express.static(path.join(__dirname, './build')));

// Route handler for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});