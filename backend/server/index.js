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
  let returnObj = {};
  let {product_id, page, count} = req.query;
  client.query(`SELECT * from qa.questions where product_id=${product_id};`, (err, data) => {
    console.log(data.rows);
    if(err) {
      res.status(500).send('Error in GET request');
      console.log(err);
    } else {
    console.log('SUCCESSFUL GET request');
    res.status(200).send(data.rows);
    }
  })
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  console.log('Made it into GET request for answers');
  let {question_id} = req.query;
  client.query(`SELECT * from qa.answers where question_id=${question_id};`, (err, data) => {
    if(err) {
      res.status(500).send('Error in GET request');
      console.log(err);
    } else {
    console.log('SUCCESSFUL GET request');
    res.status(200).send(data.rows);
    }
  })
});

// app.post('/qa/questions', (req, res) => {
//   console.log('Made it into GET request for questions');
//   client.query(`SELECT * from qa.questions where id=1;`, (err, data) => {
//     if(err) {
//       res.status(500).send('Error in GET request');
//       console.log(err);
//     } else {
//     console.log('SUCCESSFUL GET request');
//     res.status(200).send(data.rows);
//     }
//   })
// });

// app.post('/qa/questions/:question_id/answers', (req, res) => {
//   console.log('Made it into GET request for questions');
//   client.query(`SELECT * from qa.questions where id=1;`, (err, data) => {
//     if(err) {
//       res.status(500).send('Error in GET request');
//       console.log(err);
//     } else {
//     console.log('SUCCESSFUL GET request');
//     res.status(200).send(data.rows);
//     }
//   })
// });

// app.put('/qa/questions/:question_id/helpful', (req, res) => {
//   console.log('Made it into GET request for questions');
//   client.query(`SELECT * from qa.questions where id=1;`, (err, data) => {
//     if(err) {
//       res.status(500).send('Error in GET request');
//       console.log(err);
//     } else {
//     console.log('SUCCESSFUL GET request');
//     res.status(200).send(data.rows);
//     }
//   })
// });

// app.put('/qa/questions/:question_id/report', (req, res) => {
//   console.log('Made it into GET request for questions');
//   client.query(`SELECT * from qa.questions where id=1;`, (err, data) => {
//     if(err) {
//       res.status(500).send('Error in GET request');
//       console.log(err);
//     } else {
//     console.log('SUCCESSFUL GET request');
//     res.status(200).send(data.rows);
//     }
//   })
// });

// app.put('/qa/answers/:answer_id/helpful', (req, res) => {
//   console.log('Made it into GET request for questions');
//   client.query(`SELECT * from qa.questions where id=1;`, (err, data) => {
//     if(err) {
//       res.status(500).send('Error in GET request');
//       console.log(err);
//     } else {
//     console.log('SUCCESSFUL GET request');
//     res.status(200).send(data.rows);
//     }
//   })
// });

// app.put('/qa/answers/:answer_id/report', (req, res) => {
//   console.log('Made it into GET request for questions');
//   client.query(`SELECT * from qa.questions where id=1;`, (err, data) => {
//     if(err) {
//       res.status(500).send('Error in GET request');
//       console.log(err);
//     } else {
//     console.log('SUCCESSFUL GET request');
//     res.status(200).send(data.rows);
//     }
//   })
// });







app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});