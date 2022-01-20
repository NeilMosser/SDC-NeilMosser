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
  let {questionID} = req.params;
  let {page = 0, count = 5} = req.body;
  const answerQuery = `SELECT jsonb_build_object(
    'question_id', ${questionID},
    'page', ${page},
    'count', ${count},
      'results', (SELECT jsonb_object_agg(
          answers.id, (SELECT json_build_object(
            'id', answers.id,
            'body', answers.body,
            'date', answers.date,
            'answerer_name', answers.answerer_name,
            'reported', answers.reported,
            'helpfulness', answers.helpfulness,
            'photos', (SELECT jsonb_agg(json_build_object(
                'id', photos.id,
                'url', photos.url
            )) FROM qa.photos WHERE answer_id=answers.id)
          ))) FROM qa.answers WHERE question_id=${questionID}));`

  client.query(answerQuery, (err, data) => {
    // WITH answersQuery AS (
    //   SELECT id, question_id, body, date, answerer_name, answerer_email, reported, helpfulness
    //   FROM answers
    //   WHERE question_id = $1 AND reported = 0
    // ), photoJoin AS (
    //   SELECT * FROM answersQuery
    //   LEFT JOIN photos
    //   ON answersQuery.a_id = photos.answer_id
    //   AND question_id = $1
    // ), photoConsolidate as (
    //   SELECT a_id aa_id, json_agg(json_strip_nulls(json_build_object(
    //     'id', photoJoin.id,
    //     'url', photoJoin.url
    //   ))) AS all_photos
    //   FROM photoJoin
    //   GROUP BY a_id
    // ), finalResult as (
    //   SELECT DISTINCT ON (a_id)
    //   a_id answer_id, body, date_written date, answerer_name, helpful helpfulness, all_photos photos
    //   FROM photoJoin
    //   LEFT JOIN photoConsolidate
    //   ON photoJoin.a_id = photoConsolidate.aa_id)


    // SELECT json_build_object(
    //   'question', $1::int,
    //   'page', $3::int,
    //   'count', $2::int,
    //   'results', json_agg(finalResult)
    // )
    // FROM finalResult
    // LIMIT $2::int;
    // `,
    // [questionID, count, page]
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
  client.query(`INSERT INTO qa.questions (product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness)
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
  console.log('Made it into POST request for answers');
  client.query(`INSERT INTO qa.questions (question_id, body, date, answerer_name, answerer_email, reported, helpfulness)
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
  console.log('Made it into PUT request for question helpfulness');
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
  console.log('Made it into PUT request for question report');
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
  console.log('Made it into PUT request for answer helpfulness');
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
  console.log('Made it into GET request for answer report');
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