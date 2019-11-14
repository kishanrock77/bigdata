var path = require('path');
var fs = require('fs');
var os = require('os');
var express = require('express');


 


var cors = require('cors');
var app = express();
app.use(cors());



var Busboy = require('busboy');
var d = new Date();
cd = d.toDateString();

var dir = './fu/'+cd;

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);

}else
{
    console.log("Directory already exist");
}


app.get('/', function (req, res) {
    res.send('<html><head></head><body>\
               <form method="POST" enctype="multipart/form-data">\
                <input type="text" name="textfield"><br />\
                <input type="file" name="filefield" multiple><br />\
                <input type="submit">\
              </form>\
            </body></html>');
  res.end();
});


// accept POST request on the homepage
app.post('/3', function (req, res) {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      var saveTo = path.join(dir, filename);
      console.log('Uploading: ' + saveTo);
      file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', function() {
      console.log('Upload complete');
      res.writeHead(200, { 'Connection': 'close' });
      res.end("That's all folks!");
    });
    return req.pipe(busboy);

});


app.post('/', function(req, res) {
  var busboy = new Busboy({ headers: req.headers });
  var files = 0, finished = false,t=0;
  busboy.on('file', function (fieldname, file, filename) {
    console.log("Uploading: " + filename);
    ++files;
	t++;
    var seconds = new Date().getTime() / 1000;
    filename=seconds.toFixed(0) +filename;
	 
	
	 var saveTo = path.join(dir, filename);
      console.log('Uploading: ' + saveTo);
    
    var fstream = fs.createWriteStream(saveTo);
    fstream.on('finish', function() {
		 
      if (--files === 0 && finished) {
      //  res.writeHead(200, { 'Connection': 'close' });
       // res.end(  );
		     res.json({ status: 'final', message: t });
      }
    });
    file.pipe(fstream);
  });
  busboy.on('finish', function() {
    finished = true;
	
  });
  return req.pipe(busboy);
})
var server = app.listen(7000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});