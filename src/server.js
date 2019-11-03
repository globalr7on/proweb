const express = require('express');
const app = express();
const router = express.Router();

const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const { url } = require('./config/database');

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('DB Conectada'))
    .catch(err => console.log(err));

require('./config/passport')(passport);

// settings

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'vramhdevsystem',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes 
// Guardar Personas o Clientes en mongodb
const Person = require('./app/models/person');

app.get('/persondata', async (req, res) => {
    const pers = await Person.find();
    console.log(pers);
    res.render('persondata', {
        pers
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

require('./app/routes')(app, passport);

// static files
app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})

