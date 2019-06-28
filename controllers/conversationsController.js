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
    //Find the recipient in the database
    User.findOne({email: req.body.email})
        .then(recipient => {
            return recipient._id;
        })
        .then((recipientId => {
            //Create a new conversation whose owners are the current session user and recipient
            Conversation.create(new Conversation({
                users: [req.session.userId, recipientId],
                message: [] //empty conversation
            }))
                .then(()=> {
                    req.flash('success', "Conversation created successfully");
                    console.log("Conversation created successfully");
                    res.redirect('/conversations'); //should probably open the new conversation instead
                })
                .catch(err => {
                    req.flash('err', `${err}`);
                    res.redirect('/conversations/new');
                });
    }))
        .catch(err => {
            req.flash('error', `Could not find the recipient: ${err}`);
            res.redirect('/conversations/new');
    });
}

exports.index = (req, res) => {
    req.isAuthenticated();
    Conversation.find({
        //conversations in which the current user is a participant
        users: {$elemMatch: {$in: [req.session.userId]}}
    })
           .populate('users')
        .then((conversations) => {
            res.render('conversations/index', {
                conversations: conversations,
                title: "Conversations"
            });
        })
        .catch(err => {
            req.flash('error', `Error finding conversations: ${err}`);
            res.redirect('/');
            
        });
}

//should redirect to messages index I think to show the contents of the conversation
exports.show = (req, res) => {
    req.isAuthenticated();
    res.redirect('/messages'); //this actually redirects to /conversations/messages
}

exports.destroy = (req, res) => {
    req.isAuthenticated();
    Conversation.deleteOne({
        _id: req.body.id
    })
        .then(() => {
            req.flash('success', "Conversation deleted");
            res.redirect('/conversations');
        })
        .catch(err => {
            req.flash('error', `Error: ${err}`);
            res.redirect('/conversations');
        });
}

