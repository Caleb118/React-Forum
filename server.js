const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
let fs = require('fs');
let cors = require('cors');
var bodyParser = require('body-parser')

  ;
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(cors());

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/getdata', (req, res) => {

  fs.readFile('database.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    res.send(JSON.stringify(obj));
  });
});


app.post('/editdata', (req, res) => {

  let newdata = { post: req.body.post, name: req.body.name };

  fs.readFile('database.json', function (err, data) {
    var json = JSON.parse(data);
    json.splice(req.body.id, 1, newdata);

     fs.writeFile("database.json", JSON.stringify(json), function (err) {
     if (err) throw err;
       console.log('The "data was edited from the file.');
    });
   })
   res.send('it worked');

});


app.post('/postdata', (req, res) => {

  let newdata = { post: req.body.mypost, name: req.body.myname };

  fs.readFile('database.json', function (err, data) {
    var json = JSON.parse(data);
    json.push(newdata);
    fs.writeFile("database.json", JSON.stringify(json), function (err) {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });
  })

  res.redirect('http://localhost:3000/currentpost');

});

app.post('/deldata', (req, res) => {

  fs.readFile('database.json', function (err, data) {
    var json = JSON.parse(data);
    json.splice(req.body.id, 1);

     fs.writeFile("database.json", JSON.stringify(json), function (err) {
     if (err) throw err;
       console.log('The "data was removed from the file.');
    });
   })
   res.send('it worked');
});
