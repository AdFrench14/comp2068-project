const Message = require('../models/message');

/*
//Not really necessary
exports.show = (req, res) => {
    res.render()
}
*/

exports.index = (req, res) => {
    Message.find({
        conversation: req.params.id //need to figure out where we can store a convo id
    })
        .then(messages => {
            res.render('/messages/index', {
                messages: messages,
                title: "Messages" //could replace this with the actual conversation name
            });
        })
        .catch(err => {
            req.flash('error', `Error: ${err}`);
            res.redirect('/conversations/index'); //return to the conversations list if can't load messages
        });
}

/*
//Not necessary - will use a for on the conversation show page instead
exports.new = (req, res) => {

}
*/

exports.create = (req, res) => {
    Message.create(req.body.message)
        .then()
        .catch(err => {
            req.flash('error', `Error: ${err}`);
            res.redirect('/messages/index'); //should probably not do this - seems useless to redirect to the page we are currently on
        });
}

/*
//probably not necessary - can do this on the main conversation page
exports.edit = (req, res) => {

}
*/

exports.update = (req, res) => {
    Message.updateOne({
        _id: req.body.id,
        //not sure what else to query by here
    }, req.body.message, {runValidators: true})
        .then(() => {
            //not sure that we need to anything. Probably just update the view??
            res.redirect('/messages/index');
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
            res.redirect('messages/index');
        })
        .catch(err => {
            req.flash('error', `Error: ${err}`);
        });
}