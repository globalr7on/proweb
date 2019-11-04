module.exports = (app, passport) => {

    app.get('/', (req, res) => {
        res.render('index');
    });
    app.get('/Login', (req, res) => {
        res.render('login', {
            message: req.flash('loginMessage')
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/signup', (req, res) => {
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile', {
            user: req.user
        });
    });

    app.get('/person', (req, res) => {
        res.render('person', {
            message: req.flash('signupMessage')
        });
    });
  
    app.get('/persondata', (req, res) => {
        
        res.render('persondata', {
            person:req.person
        });
    });

      app.post('/persondata', (req, res) => {
        console.log('POST /persondata')
        console.log(req.body)
    
        const person = new Person()
        person.firstname = req.body.firstname
        person.lastname = req.body.lastname
        person.birthday = req.body.birthday
        person.phonenumber = req.body.phonenumber
        person.address = req.body.address
        person.gender = req.body.gender
        person.city = req.body.city
        person.province = req.body.province
        person.country = req.body.country
        person.postalcode = req.body.postalcode
        person.emailadress = req.body.emailadress
    
        person.save((err, personStored) => {
            if (err) res.status(500).send({ message: `Error al guardar registros: ${err}` })
    
            res.status(200).send({ person: personStored })
        })
    })


    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}
