//delivers a dataset of users

var User = require("../models/user");

//open the page to create a new user
exports.new = (req, res) => {
    res.render("users/new", {
        title: "New User"
    });
}

//create a new user
exports.create = (req, res) => {
    
    User.create(req.body.user)
        .then(() => {
            req.flash('success', "User successfully created");
            res.redirect("/"); //redirect to the home page
        })
        .catch((err) => {
            req.flash('error', `Error: ${err}`);
            res.redirect('/user/new');
        });
}

//Request details on a single user
exports.show = (req, res) => {
    req.isAuthenticated();
    User.findOne({
            _id: req.session.userId,
        })
        .then((user) => {
            res.render('users/show', {
                title: "Profile",
                user: user //pass in the current user object to be displayed
            });
        })
        .catch((err) => {
            req.flash('error', `Error: ${err}`);
            res.redirect('/');
        });
}

//Request list of all the registered users
exports.index = (req, res) => {
    req.isAuthenticated();
    User.find({
   
            //Filter db request by the session userId
            //_id: req.session.userId            
        })        
        .then((users) => res.render('users/index',{
            title: "Users",
            users: users
        }))
        .catch((err) => {
            req.flash('error', "Cannot find what you requested");
            res.redirect('/');
        });
}

//Open page to edit a single user's profile
exports.edit = (req, res) => {
    User.findOne({
            _id: req.params.id,
        })
        .then(user => {
            res.render('users/edit', {
                title: "Edit Profile",
                user: user
            })
        })
        .catch(err => {
            req.flash('error', `Error: ${err}`);
            res.redirect('/user/show'); //may need to provide it an ID to show
        });
}

//Update a users profile
exports.update = (req, res) => {
    User.updateOne({
            _id: req.body.id,
        }, req.body.user, {runValidators: "true"})
        .then(() => {
            req.flash('success', "User updated sucessfully");
            res.redirect("/");
        })
        .catch(err => {
            req.flash('error', `Error: ${err}`);
            res.render('user/edit', {
                user: req.body.user,
                title: "Edit User"
            }); //may need to provide it with the id to edit
        });
}

//delete a user
exports.destroy = (req, res) => {
    User.deleteOne({
            _id: req.body.id,
        })
        .then(() => {
            req.flash('success', 'User sucessfully deleted');
            res.redirect('/logout');
        })
        .catch(err => {
            req.flash('error', "Error deleting user");
            res.redirect(req.get('referer'));
        });
}