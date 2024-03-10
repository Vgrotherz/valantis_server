const express = require('express');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');
const md5 = require('md5');

const app = express();

// Allow all origins for CORS (you can restrict this to specific origins if needed)
app.use(cors());

// Serve static files from the 'build' directory of your React application
app.use(express.static(path.join(__dirname, 'build')));

// Route handler for API requests
app.post('/api', async (req, res) => {
  const apiUrl = 'http://api.valantis.store:40000/';
  const apiPassword = 'Valantis';
  
  try {
    const { action, params } = req.body;

    const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const authHeader = md5(`${apiPassword}_${timestamp}`);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth': authHeader
      },
      body: JSON.stringify({
        action,
        params
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.json({ result: data });
  } catch (error) {
    console.error('Error making API request:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route handler for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
