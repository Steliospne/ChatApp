#! /usr/bin/env node
require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "firstName" VARCHAR (50),  
  "lastName" VARCHAR (50),
  "email" VARCHAR (100),
  "userName" VARCHAR (50),  
  "pwd" VARCHAR (50),
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
  user_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS friends (
    user_id INTEGER NOT NULL,
    friend_id INTEGER NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, friend_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (friend_id) REFERENCES users(id) ON DELETE CASCADE
);



INSERT INTO users ("firstName", "lastName", "email", "userName", "pwd")
VALUES 
  ('Stelios','Pnevmatikakis','stelios@domain.com','admin1','admin11234'),
  ('Test','User','testuser@domain.com','testuser','testuser1234');


INSERT INTO friends ("user_id", "friend_id")
VALUES (1,2), (2,1);
`;

const main = async () => {
  const connectionString = process.argv[process.argv.length - 1];
  console.log(connectionString);
  console.log("seeding...");
  const client = new Client({
    connectionString: connectionString,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
};

main();
