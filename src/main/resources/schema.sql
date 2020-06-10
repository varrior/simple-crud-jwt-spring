CREATE TABLE IF NOT EXISTS Users (
     id serial PRIMARY KEY UNIQUE,
     firstName varchar(255) NOT NULL,
     lastName varchar(255) NOT NULL,
     username varchar(255) NOT NULL,
     email varchar(255) NOT NULL,
     password varchar(255) NOT NULL,
     active boolean NOT NULL,
     permission varchar(255) NOT NULL
);