const express = require('express');
const app = express();
const port = 2000;


// // ========================
// // ========================
// // TEMPLATING ENGINE
// // ========================
const {engine} = require('express-handlebars');

app.set('view engine', 'hbs');

app.engine('hbs', engine({
    layoutsDir: `${__dirname}/views/layout`,
    extname: 'hbs',
    defaultLayout: 'home',
    partialsDir: `${__dirname}/views/partials`
}));

app.use(express.static('public'));

// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'hbs');
// hbs.registerPartials(__dirname + '/views/partials', function (err) {});
// // app.engine('html', require('hbs').__express);


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

app.get('/:name/liked-songs', (req, res) => {
  res.send(`Hello ${req.params.name}, these are your liked songs!`)
});

// // ========================
// // ========================
// // STATIC FILES
// // ========================


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