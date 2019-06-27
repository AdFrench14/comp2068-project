//Delivers a list of the conversations to the user
const Conversation = require('../models/conversation');
const User = require('../models/user');

exports.new = (req, res) => {
    res.render('conversations/new', {
      title: 'New Conversation'
    });
  };

exports.create = (req, res) => {
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
   /* 
    Conversation.create(new Conversation({
                users: [req.session.userId, recipient._id],
                message: [] //empty conversation
            }))
                .then(()=> {
                    req.flash('success', "Conversation created successfully");
                    console.log("Conversation created successfully");
                    req.redirect('/conversations'); //should probably open the new conversation instead
                })
                .catch(err => {
                    req.flash('err', `${err}`);
                    res.redirect('/conversations/new');
                });
                */
    //temp conversation object that can be written to the DB
    /*j
    var conversation = new Conversation( {
        users: [req.session.userId, recipientId],
        messages: []
    });
    */
    /*
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
        */
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

//should redirect to messages index I think to show the contents of the conversation
exports.show = (req, res) => {
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

