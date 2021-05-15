const { json } = require('express');
const express = require('express');
const app = express();
const cloudinary = require('cloudinary').v2
const cors = require('cors')
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// const fs = require('fs');
const port = process.env.PORT || 3000;
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
cloudinary.config({
  cloud_name: "dlhheqv4m",
  api_key: "857463922358953",
  api_secret: "HpHQ_FgazUmrem-s19OJCLIOh1E"
});
// console.log('hiii');
// This method will save the binary content of the request as a file.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.get('/',(req,res)=>res.status(200).send('hello world'));

app.get('/getcontact',(req,res)=>{
  res.json([{name:'shahid',school:'boys'},{name:'ronaldo',school:'gbhss'},{name:'shabeer',school:'msp'},{name:'salih',school:'pkm'}])
  
})
app.post("/record-upload", (request, response) => {
  // collected image from a user
  const data = {
    recordFile: request.body.recordFile,
  }

  // upload image here
  cloudinary.uploader.upload(data.recordFile)
  .then((result) => {
    response.status(200).send({
      message: "success",
      result,
    });
  }).catch((error) => {
    response.status(500).send({
      message: "failure",
      error,
    });
  });

});
// app.patch('/binary-upload', (req, res) => {
//   req.pipe(fs.createWriteStream('./uploads/image' + Date.now() + '.png'));
//   res.end('OK');
// });

// // This method will save a "photo" field from the request as a file.
// app.patch('/multipart-upload', upload.single('photo'), (req, res) => {
//   // You can access other HTTP parameters. They are located in the body object.
//   console.log(req.body);
//   res.end('OK');
// });

app.listen(port, () => console.log(`url-shortener listening on port ${port}!`));