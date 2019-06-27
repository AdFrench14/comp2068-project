//Delivers a list of the conversations to the user
const Conversation = require('../models/conversation');
const User = require('../models/user');

exports.new = (req, res) => {
    res.render('conversations/new', {
      title: 'New Conversation'
    });
  };

exports.create = (req, res) => {
    //temp conversation object that can be written to the DB
    var conversation = new Conversation( {
        users: [User.findById(req.session.userId), User.findOne({email: req.body.email})],
        messages: []
    });

    //Conversation.create(req.body.conversation)
    Conversation.create(conversation)
        .then(() => {
            req.flash('success', "Conversation created successfully");
            req.redirect('/conversations/index'); //should probably open the new conversation instead
        })
        .catch(err => {
            req.flash('error', `Error: ${err}`);
            res.redirect('/conversations/index');
        });
}

exports.index = (req, res) => {
    Conversation.find({
        user: req.session.userId //need to be able to store more than one user this way
    })
        .then(conversations => {
            res.render('conversations/index', {
                conversations: conversations,
                title: "Conversations"
            });
        })
        .catch(err => {
            req.flash('error', `Error: ${err}`);
            res.redirect('/');
        });
}

//should redirect to messages/index I think to show the contents of the conversation
exports.show = (req, res) => {
    res.redirect('messages/index');
}

/*
//don't think we need these, shouldn't be able to edit a converstaion
exports.edit = (req, res) => {

}

exports.update = (req, res) => {

}
*/

exports.destroy = (req, res) => {
    Conversation.deleteOne({
        _id: req.body.id
    })
        .then(() => {
            req.flash('success', "Conversation deleted");
            req.redirect('/conversations/index');
        })
        .catch(err => {
            req.flash('error', `Error: ${err}`);
            res.redirect('/conversations/index');
        });
}

