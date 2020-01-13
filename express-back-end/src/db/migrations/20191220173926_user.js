
exports.up = knex =>
  knex.schema.createTable('users', table => {
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.text('email');
    table.text('password_digest');
    table.bigInteger('phone');
    table.text('location');
  });



exports.down = knex =>
  knex.schema.dropTableIfExists('users');
