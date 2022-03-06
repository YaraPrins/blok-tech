const express = require('express')
const app = express()
const port = 3000


// ========================
// ========================
// STATIC FILES
// ========================
app.use(express.static('public'))


// ========================
// ========================
// TEMPLATING ENGINE
// ========================


// const Handlebars = require("handlebars");
// const template = Handlebars.compile("Name: {{name}}");
// console.log(template({ name: "Yara" }));


// ========================
// ========================
// ROUTES
// ========================
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/profile/:name', (req, res) => {
  res.send(`Hello ${req.params.name}`)
})
app.get('/about', (req, res) => {
  res.send('This is an About page')
})
app.get('/login', (req, res) => {
  res.send('Please login to continue!')
})
app.get('/:name/liked-songs', (req, res) => {
  res.send(`Hello ${req.params.name}, these are your liked songs!`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// ========================
// ========================
// STATUS 500
// ========================
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// ========================
// ========================
// ERROR 404
// ========================
app.use((req, res, next) => {
  res.status(404).send("Error 404 (Sorry! Page not found)")
})