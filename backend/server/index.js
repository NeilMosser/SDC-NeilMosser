const express = require('express');

const client = require('../database/index.js');

const PORT = 3000;

const app = express();


app.get('/questions', (req, res) => {
  console.log('Made it into GET request for questions');
  client.query(`SELECT * from questions where id = 1;`, (err, data) => {
    if(err) {
      res.status(500).send('Error in GET request');
      console.log(err);
    } else {
    console.log('SUCCESSFUL GET request');
    res.status(200).send(data);
    }
  })
});

app.get('/answers', (req, res) => {
  console.log('Made it into GET request for questions');
  client.query(`SELECT * from answers where id = 1;`, (err, data) => {
    if(err) {
      res.status(500).send('Error in GET request');
      console.log(err);
    } else {
    console.log('SUCCESSFUL GET request');
    res.status(200).send(data);
    }
  })
});

app.get('/products', (req, res) => {
  console.log('Made it into GET request for questions');
  client.query(`SELECT * from products where id = 1;`, (err, data) => {
    if(err) {
      res.status(500).send('Error in GET request');
      console.log(err);
    } else {
    console.log('SUCCESSFUL GET request');
    res.status(200).send(data);
    }
  })
});

app.get('/photos', (req, res) => {
  console.log('Made it into GET request for questions');
  client.query(`SELECT * from photos where id = 1;`, (err, data) => {
    if(err) {
      res.status(500).send('Error in GET request');
      console.log(err);
    } else {
    console.log('SUCCESSFUL GET request');
    res.status(200).send(data);
    }
  })
});





app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});