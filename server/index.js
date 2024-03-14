const express = require('express');
const path = require('path');
const server = express();

server.use(express.static('build'));

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = server;