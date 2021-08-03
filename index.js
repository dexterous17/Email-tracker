const express = require('express');
const app = express();

var pixelBytes = new Buffer.alloc(35);
pixelBytes.write("R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=", "base64");

app.use('/hello',(req,res)=>{
  res.send('<image src="images" alt="hello">')
})


app.use('/images', (req,res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(ip); // ip address of the user
  console.log(req.url)
  //res.sendFile(data);
  res.send(pixelBytes, { 'Content-Type': 'image/gif' }, 200);
 /* console.log('Hello')
  fs.readFile('Assets/Images/Transparent.gif', function(err, data) {
    res.writeHead(200, {'Content-Type': 'image/gif'});
    res.write(data);
    return res.end();
  });*/
});
app.listen(5000);