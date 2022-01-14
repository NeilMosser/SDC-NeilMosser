var pg = require('pg');
var { Client } = require('pg');

const client = new Client({
  user: "postgres",
  host: 'localhost',
  database: 'qadb',
  password: "password",
  port: 5432
});

client.connect((err) => {
  if(err) {
    console.log(err);
  } else {
  console.log("connected to db");
  }
});

module.exports = client;



// var pg = require('pg');
// var conString = "postgres://postgres:password@localhost:5432/qadb";

// var client = new pg.Client(conString);
// client.connect();

// module.exports = client;