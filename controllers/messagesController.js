var Conversation = require('../models/conversation');

//NOT IN USE
exports.index = (req, res) => {
    Message.find({
        conversation: req.params.id //need to figure out where we can store a convo id
    })
        .then(messages => {
            res.render('messages/index', {
                messages: messages,
                title: "Messages" //could replace this with the actual conversation name
            });
        })
        .catch(err => {
            req.flash('error', `Error: ${err}`);
            res.redirect('/conversations'); //return to the conversations list if can't load messages
        });
}

exports.create = (req, res) => {
    req.body.message.user = req.session.userId;
    console.log("conversation ID: " + req.body.conversationId);
    console.log("new message content: " + req.body.message.content);
    console.log("new message user: " + req.body.message.user);

    Conversation.findById(req.body.conversationId)
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

}
*/

//Edit the text of a message
exports.update = (req, res) => {
    Conversation.findOneAndUpdate(
    { "_id": req.body._id, "messages._id": message._id },
    { 
        "$set": {
            "messages.$.content": req.body.message.content 
        }
    })
        .then(() => {
            req.flash('success', `Message updated`);
            res.redirect(req.get('referer'))
        })
        .catch(err => {
            req.flash('error', `Error: Can't update message`);
            res.redirect(req.get('referer'))
        });


    Message.updateOne({
        _id: req.body.id,
        //not sure what else to query by here
    }, req.body.message, {runValidators: true})
        .then(() => {
            //not sure that we need to anything. Probably just update the view??
            res.redirect('/messages');
        })
        .catch(err => {
            req.flash('error', `Error: ${err}`);
        });
}

exports.destroy = (req, res) => {
    Message.deleteOne({
        _id: req.body.id
        //not sure what else to query by here
    })
        .then(() => {
            req.flash('success', "Message deleted");
            res.redirect('/messages');
        })
        .catch(err => {
            req.flash('error', `Error: ${err}`);
        });
}