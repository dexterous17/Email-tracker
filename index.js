const express = require('express');
const app = express();

app.use('/images/', (req,res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(ip); // ip address of the user
  console.log(req.url)
  res.send('Hello world')
});
app.listen(5000);