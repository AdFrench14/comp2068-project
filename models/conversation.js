const mongoose = require('mongoose');

const message = require('./message'); //require the message model that we need
const user = require('./user'); //require the user model that we need
/*
const MessageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: false
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const ConversationSchema = new mongoose.Schema({
    messages: [MessageSchema]
})
*/

const ConversationSchema = new mongoose.Schema({
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}]
})

module.exports = mongoose.model('Conversation', ConversationSchema);