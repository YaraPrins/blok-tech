const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// // ========================
// // ========================
// // DATABASE
// // ========================
// bron: https://youtu.be/FNJkd2aDOy0 (uitleg Sonja over verbinding MongoDB)
const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');

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
  })
  .catch( error => {
    //if connection is failed, show errors
    console.log(error);
  })



// // ========================
// // ========================
// // TEMPLATING ENGINE
// // ========================
const {engine} = require('express-handlebars');


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


// ========================
// ========================
// MIDDLEWARE
// ========================

const multer = require('multer');
const upload = multer({dest: 'uploads/' });

//bron: https://www.npmjs.com/package/body-parser

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use(function(req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   res.end(JSON.stringify(req.body, null, 2))
// })


// ========================
// ========================
// ROUTES
// ========================
app.get('/', (req, res) => {
  res.render('main')
});

app.get('/profile/:name', (req, res) => {
  res.send(`Hello ${req.params.name}`)
});

app.get('/about', (req, res) => {
  res.send('This is an About page')
});

app.get('/login', (req, res) => {
  res.send('Please login to continue!')
});

app.get('/liked-songs', (req, res) => {
  res.render('liked')
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