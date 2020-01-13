exports.up = knex =>
  knex.schema.createTable('mechanics', table => {
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.text('email');
    table.text('password_digest');
    table.bigInteger('phone');
    table.integer('hourly_rate');
    table.boolean('active');
    table.text('description');
    table.text('avatar');
    table.text('location');
  });

exports.down = knex =>
  knex.schema.dropTableIfExists('mechanics');

