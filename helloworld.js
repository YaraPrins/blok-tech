// const express = require('express');
// const app = express();
// const port = 5000;
// const name = "Yara";
// const name2 = "Bob";
// let age = "24";

// app.get('/', (req, res) => {
//   res.send(`Hello ${name}, How are you? I'm ${name2}! I'm ${age} years old.`)
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })



// // ========================
// // ========================
// // ERROR 404

// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })

// app.use((req, res, next) => {
//   res.status(404).send("Sorry! Page not found")
// })