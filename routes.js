const express = require('express');
const app = express();

const pageRoutes = require('./routes/pageRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

app.use('/', pageRoutes);
app.use('/conversations', conversationRoutes);

module.exports = app;