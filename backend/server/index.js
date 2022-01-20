const path = require('path');
const express = require('express');

const client = require('../database/index.js');

const PORT = 3000;

const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html"));
// });


app.get('/qa/questions', (req, res) => {
  console.log('Made it into GET request for questions');
  // let returnObj = {};

  let {product_id, page = 1, count = 5} = req.query;
  let questionQuery = `SELECT * from qa.questions where product_id=${product_id} LIMIT ${count};`;
  //questionQuery = `SELECT JSON_ARRAYAGG(JSON_OBJECT(product_id, product_id, question_body, question_body)) from qa.questions where product_id=1`;
  client.query(questionQuery, (err, data) => {
    console.log(data);
    if(err) {
      res.status(500).send('Error in GET request');
      console.log(err);
    } else {
    console.log('SUCCESSFUL GET request');
    res.status(200).send(data.rows);
    }
  })
});

app.get(`/qa/questions/:questionID/answers`, (req, res) => {
  console.log('Made it into GET request for answers');
  console.log(req.body);
  let {questionID} = req.params;
  let {page = 1, count = 5} = req.body;
  client.query(`SELECT * from qa.answers where question_id=${questionID} LIMIT ${count};`, (err, data) => {
    if(err) {
      res.status(500).send('Error in GET request');
      console.log(err);
    } else {
    console.log('SUCCESSFUL GET request');
    res.status(200).send(data.rows);
    }
  })
});

app.post('/qa/questions', (req, res) => {
  console.log('Made it into POST request for questions');
  console.log(req);
  const {body, name, email, product_id} = req.body;
  client.query(`INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
                VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [product_id, body, Date.now(), name, email, "f", 0], (err, data) => {
    if(err) {
      res.status(500).send('Error in POST request');
      console.log(err);
    } else {
    console.log('SUCCESSFUL POST request');
    res.status(200).send(data.rows);
    }
  })
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  console.log('Made it into GET request for questions');
  client.query(`INSERT INTO questions (question_id, body, date, answerer_name, answerer_email, reported, helpfulness)
  VALUES ($1, $2, $3, $4, $5, $6, $7)`, (err, data) => {
    if(err) {
      res.status(500).send('Error in GET request');
      console.log(err);
    } else {
    console.log('SUCCESSFUL GET request');
    res.status(200).send(data.rows);
    }
  })
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  console.log('Made it into GET request for questions');
  let {questionID} = req.params;
  client.query(`UPDATE qa.questions SET question_helpfulness =
  question_helpfulness + 1 WHERE id=${questionID};`, (err, data) => {
    if(err) {
      res.status(500).send('Error in GET request');
      console.log(err);
    } else {
    console.log('SUCCESSFUL PUT request - question helpful');

    }
  })
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  console.log('Made it into GET request for questions');
  let {questionID} = req.params;
  client.query(`UPDATE qa.questions SET reported = true WHERE id=${questionID};`, (err, data) => {
    if(err) {
      res.status(500).send('Error in GET request');
      console.log(err);
    } else {
    console.log('SUCCESSFUL GET request');
    res.status(200).send(data.rows);
    }
  })
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  console.log('Made it into GET request for questions');
  let {answer_id} = req.params;
  client.query(`UPDATE qa.answers SET helpfulness = helpfulness + 1 WHERE id=${answer_id};`, (err, data) => {
    if(err) {
      res.status(500).send('Error in GET request');
      console.log(err);
    } else {
    console.log('SUCCESSFUL GET request');
    res.status(200).send(data.rows);
    }
  })
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  console.log('Made it into GET request for questions');
  let {answer_id} = req.params;
  client.query(`UPDATE qa.answers SET reported = 1 WHERE
  id=${answer_id};`, (err, data) => {
    if(err) {
      res.status(500).send('Error in GET request');
      console.log(err);
    } else {
    console.log('SUCCESSFUL GET request');
    res.status(200).send(data.rows);
    }
  })
});







app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});