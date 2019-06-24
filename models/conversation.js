const mongoose = require('mongoose');

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


module.exports = mongoose.model('Conversation', ConversationSchema);