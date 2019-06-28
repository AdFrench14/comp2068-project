//Delivers a list of the conversations to the user
const Conversation = require('../models/conversation');
const User = require('../models/user');

exports.new = (req, res) => {
    req.isAuthenticated();
    res.render('conversations/new', {
      title: 'New Conversation'
    });
  };

exports.create = (req, res) => {
    req.isAuthenticated();
    console.log(`session userId ${req.session.userId}`);
    console.log(`email of recipient ${req.body.email}`);
    console.log(`id of recipient ${User.findOne({email: req.body.email})}`);

    console.log("CURRENT USER userId: " + User.findOne({_id: req.session.userId}));
    /*
    //temp conversation object that can be written to the DB
    var conversation = new Conversation( {
        users: [User.findById(req.session.userId), User.findOne({email: req.body.email})],
        messages: []
    });
    */

    var conversation = new Conversation;
    /*var conversation = new Conversation;
    conversation.users.push(User.findById(req.session.userId));
    conversation.users.push(User.findOne({email:req.body.email}));*/
    //conversation.save();
    console.log("USERS IN CONVO: " + conversation.users[0]);

    //Conversation.create(req.body.conversation)
    Conversation.create(conversation)
        .then(() => {
            req.flash('success', "Conversation created successfully");
            console.log("Conversation created successfully");
            req.redirect('/conversations'); //should probably open the new conversation instead
        })
        .catch(err => {
            req.flash('error', `Error: ${err}`);
            res.redirect('/conversations');
        });
}

exports.index = (req, res) => {
    req.isAuthenticated();
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

//should redirect to messages index I think to show the contents of the conversation
exports.show = (req, res) => {
    req.isAuthenticated();
    res.redirect('/messages'); //this actually redirects to /conversations/messages
}

/*
//don't think we need these, shouldn't be able to edit a converstaion
exports.edit = (req, res) => {

}

exports.update = (req, res) => {

}
*/

exports.destroy = (req, res) => {
    req.isAuthenticated();
    Conversation.deleteOne({
        _id: req.body.id
    })
        .then(() => {
            req.flash('success', "Conversation deleted");
            req.redirect('/conversations');
        })
        .catch(err => {
            req.flash('error', `Error: ${err}`);
            res.redirect('/conversations');
        });
}

