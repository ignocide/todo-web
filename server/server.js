const express = require('express');
const path = require('path');

const app = express();
const compression = require('compression');

app.use(compression());
app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000);
