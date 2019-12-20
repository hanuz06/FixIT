// -- DROP TABLE IF EXISTS rating CASCADE;
// -- DROP TABLE IF EXISTS inspection CASCADE;
// -- DROP TABLE IF EXISTS mechanic CASCADE;
// -- DROP TABLE IF EXISTS user CASCADE;
knex.schema.dropTable('rating')
knex.schema.dropTable('inspection')
knex.schema.dropTable('mechanic')
knex.schema.dropTable('user')

knex.schema.createTable('user', function (table) {
  table.increments();
  table.string('first_name');
  table.string('last_name');
  table.text('email');
  table.text('password_digest');
  table.integer('phone');
  table.text('location')

})

knex.schema.createTable('mechanic', function (table) {
  table.increments();
  table.string('first_name');
  table.string('last_name');
  table.text('email');
  table.text('password_digest');
  table.integer('phone');
  table.text('location');
  table.boolean('active');
  table.text('description');
  table.text("avatar");
  table.text('location')
})

knex.schema.createTable('inspection', function (table) {

})

knex.schema.createTable('rating', function (table) {

})

// -- CREATE TABLE mechanic (
// --   id SERIAL PRIMARY KEY NOT NULL,
// --   first_name VARCHAR(255) NOT NULL,
// --   last_name VARCHAR(255) NOT NULL,
// --   email text not null unique,
// --   password_digest text not null,
// --   inspection_fee int,
// --   phone int,
// --   active boolean default FALSE,
// --   description VARCHAR(255),
// --   avatar VARCHAR(255) NOT NULL,
// --   location VARCHAR(255) NOT NULL
// -- );

// -- CREATE TABLE user (
// --   id SERIAL PRIMARY KEY NOT NULL,
// --   first_name VARCHAR(255) NOT NULL,
// --   last_name VARCHAR(255) NOT NULL,
// --   email text not null unique,
// --   password_digest text not null,
// --   phone int,
// --   location VARCHAR(255) NOT NULL
// -- );

// -- CREATE TABLE inspection (
// --   id SERIAL PRIMARY KEY NOT NULL,
// --   mechanic_id INTEGER REFERENCES mechanic(id) ON DELETE CASCADE,
// --   user_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
// --   date VARCHAR(255) NOT NULL,
// --   confirmed boolean default FALSE,
// --   completed boolean default FALSE,
// --   description VARCHAR(255),
// --   car_make VARCHAR(255),
// --   car_year VARCHAR(255),

// -- );

// -- CREATE TABLE rating (
// --   id SERIAL PRIMARY KEY NOT NULL,
// --   mechanic_id INTEGER REFERENCES mechanic(id) ON DELETE CASCADE,
// --   inspection_id INTEGER REFERENCES inspection(id) ON DELETE CASCADE,
// --   user_id INTEGER REFERENCES user(id) ON DELETE CASCADE,
// --   rating SMALLint
// -- );