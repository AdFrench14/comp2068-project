const express = require('express');
const app = express();

<<<<<<< HEAD
const pageRoutes = require('./routes/pageRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

app.use('/', pageRoutes);
app.use('/conversations', conversationRoutes);
=======
const pageRoutes = require('./routes/pages');
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages');
const conversationRoutes = require('./routes/conversations');
const sessionRoutes = require('./routes/sessions');


app.use('/', pageRoutes);
app.use('/conversations', conversationRoutes);
app.use('/messages', messageRoutes);
app.use('/users', userRoutes);
app.use('/', sessionRoutes);
>>>>>>> master

module.exports = app;