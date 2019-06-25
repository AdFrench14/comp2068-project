const User = require('../models/user');

exports.login = (req, res) => {
    res.render('sessions/login', {
        title: "Login"
    });
}

exports.authenticate = (req, res) => {
    console.log('GOT HERE');
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if(!user) throw new Error('Error: Your credentials do not match');
            console.log('FOUND A USER');
            user.authenticate(req.body.password, (err, isMatch) => {
                if(err) throw new Error(err);

                if(isMatch) {
                    req.session.userId = user.id;
                    req.flash('success', 'Log in successful');
                    console.log('USER LOGIN SUCCESSFUL');
                    res.redirect('/conversations');
                }
                else {
                    req.flash('error', 'Error: Your credentials do not match');
                    res.redirect('/login');
                }
            });
        })
        .catch(err => {
            req.flash('error', `Error: ${err}`);
            console.log('DID NOT FIND A USER');
            res.redirect('/');
        });
}


exports.logout = (req, res) => {
    req.session.userId = null;
    req.flash('success', 'Log out sucessful');
    res.redirect('/');
}