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
//Modulo de Personas -------------------------------------

    const Persons = require('./models/person');

    app.get('/persondata', async (req, res) => {
        const Person_1 = await Persons.find();
        console.log(Person_1);
        res.render('persondata', {
            Person_1
        });
    });

     app.post('/persondata', async (req, res) => {
        const persons = await new Person(req.body); 
        persons.save();
        res.status(200).send({ person: personStored })
        res.send('recibido');
     });

//---------------------------------------------------------

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
