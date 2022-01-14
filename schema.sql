-- create the db
DROP DATABASE IF EXISTS qadb;
CREATE DATABASE qadb;
-- SELECT qadb;



-- DROP SCHEMA IF EXISTS qa CASCADE;
-- CREATE SCHEMA qa;
DROP TABLE IF EXISTS products, questions, answers, photos;

-- product table
CREATE TABLE products (
  id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- questions table
CREATE TABLE questions (
  id INT PRIMARY KEY,
  product_id INT NOT NULL ,
  question_body VARCHAR(255) NOT NULL,
  question_date VARCHAR(255) NOT NULL,
  asker_name VARCHAR(255) NOT NULL,
  asker_email VARCHAR(255) NOT NULL,
  reported BOOLEAN NOT NULL,
  question_helpfulness INT NOT NULL
  -- CONSTRAINT fk_products
  --   FOREIGN KEY(product_id)
  --     REFERENCES products(id)
);

-- answers table
CREATE TABLE answers (
  id INT PRIMARY KEY,
  question_id INT NOT NULL,
  body VARCHAR(255) NOT NULL,
  date VARCHAR(255) NOT NULL,
  answerer_name VARCHAR(255) NOT NULL,
  answerer_email VARCHAR(255) NOT NULL,
  reported INT NOT NULL,
  helpfulness INT NOT NULL
  -- CONSTRAINT fk_questions
  --   FOREIGN KEY(question_id)
  --     REFERENCES questions(id)
);

-- photos table
CREATE TABLE photos(
  id INT PRIMARY KEY,
  answer_id INT NOT NULL,
  url VARCHAR(255) NOT NULL
  -- CONSTRAINT fk_answers
  --   FOREIGN KEY(answer_id)
  --     REFERENCES answers(id)
);


-- need to figure out how to install and run postgres to check