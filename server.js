const express = require ('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const request = require('request');

// var proxy = require('http-proxy-middleware')

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/rooms/:id', express.static(path.join(__dirname, '/public')));

app.get('/api/rooms/:id/listing', (req, res) => {
  console.log(req.query.id);
  request(`http://localhost:3003/api/rooms/${req.params.id}/listing`, (err, response, body ) => {
    if(err) {
      console.log(err)
      res.send(404);
    } else{
      res.status(200).send(body);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});














