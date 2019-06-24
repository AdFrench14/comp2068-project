const express = require('express');
const app = express();

const pageRoutes = require('./routes/pages');

app.use('/', pageRoutes);

module.exports = app;