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

// photos
app.get('/api/rooms/:id/photos', (req, response) => {
  request(`http://localhost:3006/api/rooms/${req.params.id}/photos`, (err, res, body)=> {
    if(err){
      response.status(404);
      response.end()
    }else {
      response.status(200);
      response.end(body)
    }
  });
});

// listings
app.get('/api/rooms/:id/listing', (req, res) => {
  console.log(req.query.id);
  request(`http://localhost:3003/api/rooms/${req.params.id}/listing`, (err, response, body ) => {
    if(err) {
      res.send(404);
    } else{
      res.status(200).send(body);
    }
  });
});

// reviews
app.get('/api/rooms/:id/reviews/', (req, response) => {
  request(`http://localhost:3004/api/rooms/${req.params.id}/reviews`, (err, res, body)=> {
    if(err){
      response.status(404);
      response.end()
    }else {
      response.status(200);
      response.end(body)
    }
  });
});

app.get('/api/rooms/:id/searchReviews', (req, response) => {
  request(`http://localhost:3004/api/rooms/${req.params.id}/searchReviews`, (err, res, body)=> {
    if(err){
      response.status(404);
      response.end()
    }else {
      response.status(200);
      response.end(body)
    }
  });
});

// info
app.get('/api/rooms/:id/info', (req, res) => {
  request(`http://localhost:3001/api/rooms/${req.params.id}/info`, (error, response, body) => {
    if (error){
      console.log('working')
      res.send(404);
    } else {
      res.status(200).send(body);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});