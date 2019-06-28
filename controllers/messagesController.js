var Conversation = require('../models/conversation');

exports.create = (req, res) => {
    req.body.message.user = req.session.userId;
    console.log("conversation ID: " + req.body.conversation.id);
    console.log("new message content: " + req.body.message.content);
    console.log("new message user: " + req.body.message.user);

    Conversation.findById(req.body.conversation.id)
        .then(conversation => {
            console.log("Conversation object from db: " + conversation);
            console.log("conversation messages from db: " + conversation.messages);
            conversation.messages.push(req.body.message);
            conversation.save();
            res.redirect(req.get('referer')); //refresh the message/index page
        })
        .catch(err => {
            req.flash('error', "Error writing message to the database");
            res.redirect(req.get('referer'));
        });
}

//Render the page
exports.edit = (req, res) => {
    console.log("received conversation id: " + req.params.convoId);
    console.log("received message id: " + req.params.messageId);

    Conversation.findOne({_id: req.params.convoId})
        .then(conversation => {
            console.log("CONVERSATION FOUND");
            console.log('requested message: ' + conversation.messages.id(req.params.messageId));
            req.flash('success', "Message found");
            res.render(`messages/edit`, {
                title: "Edit Message",
                message: conversation.messages.id(req.params.messageId),
                conversation: conversation
        });
    })
        .catch(err => {
            req.flash('error', "Error could not find the messaged");
            req.redirect(req.get('referer'));
        });
}

//Edit the text of a message
exports.update = (req, res) => {
    Conversation.findOneAndUpdate(
    { "_id": req.body.conversation.id, "messages._id": req.body.message.id },
    { 
        "$set": {
            "messages.$.content": req.body.message.content 
        }
    })
        .then(() => {
            req.flash('success', `Message updated`);
            res.redirect(`/conversations/${req.body.conversation.id}`);
        })
        .catch(err => {
            req.flash('error', `Error: Can't update message`);
            res.redirect(`/conversations/${req.body.conversation.id}`);
        });
}

exports.destroy = (req, res) => {
    Conversation.findById(req.body.conversation.id)
        .then(conversation => {
            conversation.messages.id(req.body.message.id).remove();
            conversation.save();
            req.flash('success', `Message deleted`);
            res.redirect(`/conversations/${req.body.conversation.id}`);
        })
        .catch(err => {
            req.flash('error', `Error: Can't delete message`);
            res.redirect(`/conversations/${req.body.conversation.id}`);
        });
}