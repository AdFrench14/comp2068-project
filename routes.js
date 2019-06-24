const express = require('express');
const app = express();

const pageRoutes = require('./routes/pageRoutes');

app.use('/', pageRoutes);

module.exports = app;