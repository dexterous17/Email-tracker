const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser'); 



app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);


app.get('/',(req,res)=>{
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(ip);
  res.render('index.html')
})

app.post('/sendemail',(req,res)=>{

  const Email  =req.body.Email;
  const Password = req.body.Password;
  const To = req.body.To;
  const Subject = req.body.Subject;
  const Html = req.body.Html;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: Email,
        pass: Password
         }
    });
    
  
    const mailOptions = {
      from: Email,
      to: To,
      subject: Subject,
      html: Html + '<image src="" alt="image"></image>'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.redirect('/')
      } else {
        console.log('Email sent: ' + info.response);
        res.sendStatus(200)
      }
    });
})


app.use('/images', (req,res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(ip); // ip address of the user
  console.log(req.url)
  const pixelBytes = new Buffer.alloc(35);
  pixelBytes.write("R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=", "base64");
  res.send(pixelBytes, { 'Content-Type': 'image/gif' }, 200);
});
app.listen(process.env.port || 5000);