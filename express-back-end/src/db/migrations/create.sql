DROP TABLE IF EXISTS rating CASCADE;
DROP TABLE IF EXISTS inspection CASCADE;
DROP TABLE IF EXISTS mechanic CASCADE;
DROP TABLE IF EXISTS user CASCADE;

CREATE TABLE user (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email text not null unique,
  password_digest text not null,
  phone int,
  location VARCHAR(255) NOT NULL
);

CREATE TABLE mechanic (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email text not null unique,
  password_digest text not null,
  inspection_fee int,
  phone int,
  active boolean default FALSE,
  description VARCHAR(255),
  avatar VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL
);

CREATE TABLE inspection (
  id SERIAL PRIMARY KEY NOT NULL,
  mechanic_id INTEGER REFERENCES mechanic(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
  date VARCHAR(255) NOT NULL,
  confirmed boolean default FALSE,
  completed boolean default FALSE,
  description VARCHAR(255),
  car_make VARCHAR(255),
  car_year VARCHAR(255),

);

CREATE TABLE rating (
  id SERIAL PRIMARY KEY NOT NULL,
  mechanic_id INTEGER REFERENCES mechanic(id) ON DELETE CASCADE,
  inspection_id INTEGER REFERENCES inspection(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
  rating SMALLint
);