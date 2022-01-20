var pg = require('pg');
var { Pool } = require('pg');
require('dotenv').config();

const client = new Pool({
  user: process.env.DATBASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASSWORD,
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