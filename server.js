const express = require('express');
const {engine} = require('express-handlebars');

const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');

//bron: https://www.npmjs.com/package/body-parser
const bodyParser = require('body-parser');
const { template } = require('lodash');
const { route } = require('express/lib/application');

const passport = require('passport');
const strategy = require('passport-local').Strategy
const session = require('express-session');
const bcrypt = require('bcrypt');


const app = express();
const port = process.env.PORT || 3000;

// // ========================
// // ========================
// // TEMPLATING ENGINE
// // ========================

/* BRONNEN
  .handlebars extensie naar .hbs extensie
    https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65

  express-handlebars tutorial die ik heb gevolgd om het te laten werken
    https://youtu.be/HxJzZ7fmUDQ
    (comment onder deze video)
*/
app.set('view engine', 'hbs');

app.engine('hbs', engine({
    layoutsDir: `${__dirname}/views/layout`,
    extname: 'hbs',
    defaultLayout: 'home',
    partialsDir: `${__dirname}/views/partials`
}));

// // ========================
// // ========================
// // STATIC FILES
// // ========================

app.use(express.static('public'));

// // ========================
// // ========================
// // DATABASE
// // ========================
// bron: https://youtu.be/FNJkd2aDOy0 (uitleg Sonja over verbinding MongoDB)

// TESTER DATABASE

//function connectDB Tester
async function testConnectDB () {
  // get URI from .env file
  const uri = "mongodb+srv://tester:testing123@cluster0.cczua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  //make connection to database
  const options = { useUnifiedTopology: true };
  const client = new MongoClient(uri, options);
  await client.connect();
}
testConnectDB()
  .then(() => {
    //if succesfull connection is made, show a message
    console.log('TESTER --> We have a connection to MongoDB!');
  })
  .catch( error => {
    //if connection is failed, show errors
    console.log(error);
  })

// OWN DATABASE
let db = null;
//function connectDB
async function connectDB () {
  // get URI from .env file
  const uri = process.env.DB_URI;
  //make connection to database
  const options = { useUnifiedTopology: true };
  const client = new MongoClient(uri, options);
  await client.connect();
  db = await client.db(process.env.DB_NAME);
}
connectDB()
  .then(() => {
    //if succesfull connection is made, show a message
    console.log('We have a connection to MongoDB!');

    const users = db.collection('users');
    app.locals.users = users;
  })
  .catch( error => {
    //if connection is failed, show errors
    console.log(error);
  })




// ========================
// ========================
// MIDDLEWARE
// ========================

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false }))

// parse application/json
app.use(bodyParser.json())

// passport.use(new Strategy(
//     (username, passpord, done) => {
//       app.locals.users.findOne({ username }, (err, users) => {
//         if (err) {
//           return done(err);
//         }

//         if (!user) {
//           return done(null, false);
//         }

//         if (user.password != password) {
//           return done(null, false);
//         }

//         return done(null, user);
//       })
//     }

// ))



// ========================
// ========================
// ROUTES
// ========================
app.get('/', (req, res) => {
  res.render('zero-state', { title: 'Musicr | Music Matcher', layout: 'zero-state'});
});

app.get('/home', (req, res) => {
  res.render('main', { title: 'Home', layout: 'home'});
});

/* ==================== LOG IN ===================== */

app.get('/login', (req, res) => {
  res.render('log-in', { title: 'Log In', layout: 'log-in'});
});

app.post('/login', (req, res) => {
  // try {
  //   res.redirect('/welcome')
  // } catch {
  //   res.redirect('/login')
  // }
  // res.render('main', { title: 'Log In', layout: 'home'});
});

/* ==================== SIGN UP ==================== */

app.get('/signup', (req, res) => {
  res.render('sign-up', { title: 'Sign Up', layout: 'log-in'});
});

app.post('/signup', async (req, res) => {
    try {
      let addUser = {
          name: req.body.username,
          password: req.body.password,
          email: req.body.email
        }
      await db.collection('users').insertOne(addUser)
      res.redirect('/login')
    } catch {
      res.redirect('/signup')
    }
  res.render('sign-up', { title: 'Sign Up', layout: 'log-in'});
});


/* ============== OTHER ROUTES ================== */

app.get('/getting-started', (req, res) => {
  res.render('gettings-started', { title: 'Welcome, let\'s get started!', layout: 'home'});
});

app.get('/matcher', (req, res) => {
  res.render('matcher', { title: 'Song Matcher', layout: 'matcher'});
});

app.get('/saved', (req, res) => {
  res.render('saved', { title: 'Saved Songs', layout: 'home'});
});

app.get('/settings', (req, res) => {
  res.render('settings', { title: 'Settings', layout: 'home'});
});

app.get('/settings/edit-profile', (req, res) => {
  res.render('edit-profile', { title: 'Edit Profile', layout: 'home'});
});

app.get('/settings/edit-profile/my-music-taste', (req, res) => {
  res.render('music-taste', { title: 'Edit My Music Taste', layout: 'home'});
});



// // ========================
// // ========================
// // ERROR 404
// // ========================
app.use(function (req, res, next) {
  res.status(404).send('Sorry! Can\'t find that!')
});

// ========================
// ========================
// STATUS 500
// ========================
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});