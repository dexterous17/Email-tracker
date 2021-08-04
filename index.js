const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser'); 


app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/sendemail',(req,res)=>{
  const data = req.body;
  console.log(data)
  /*var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail@gmail.com',
      pass: 'yourpassword'
    }
  });
  
  var mailOptions = {
    from: 'youremail@gmail.com',
    to: 'myfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    html: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });*/

})


app.use('/images', (req,res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(ip); // ip address of the user
  console.log(req.url)
  const pixelBytes = new Buffer.alloc(35);
  pixelBytes.write("R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=", "base64");
  res.send(pixelBytes, { 'Content-Type': 'image/gif' }, 200);
});
app.listen(5000);