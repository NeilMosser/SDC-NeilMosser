-- create the db

DROP DATABASE IF EXISTS qadb;
CREATE DATABASE qadb;
\c qadb;



DROP SCHEMA IF EXISTS qa CASCADE;
CREATE SCHEMA qa;
SET search_path TO qa;
DROP TABLE IF EXISTS products, questions, answers, photos;

-- product table
-- CREATE TABLE products (
--   id INTEGER NOT NULL PRIMARY KEY,
--   name VARCHAR(255) NOT NULL
-- );

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
    -- FOREIGN KEY(product_id)
      --   REFERENCES products(id)
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
  helpfulness INT NOT NULL,
  -- CONSTRAINT fk_questions
    FOREIGN KEY(question_id)
      REFERENCES questions(id)
);

-- photos table
CREATE TABLE photos(
  id INT PRIMARY KEY,
  answer_id INT NOT NULL,
  url VARCHAR(255) NOT NULL,
  -- CONSTRAINT fk_answers
    FOREIGN KEY(answer_id)
      REFERENCES answers(id)
);

-- COPY products(id, name)
-- FROM '/Users/neilmosser/Desktop/SDCData/productParsed.csv'
-- DELIMITER ','
-- CSV HEADER;

COPY questions(id, product_id, question_body, question_date,
asker_name, asker_email, reported, question_helpfulness)
FROM '/Users/neilmosser/Desktop/SDCData/questions.csv'
DELIMITER ','
CSV HEADER;

COPY answers(id, question_id, body, date,
answerer_name, answerer_email, reported, helpfulness)
FROM '/Users/neilmosser/Desktop/SDCData/answers.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id, answer_id, url)
FROM '/Users/neilmosser/Desktop/SDCData/answers_photos.csv'
DELIMITER ','
CSV HEADER;


