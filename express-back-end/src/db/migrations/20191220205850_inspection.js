
exports.up = knex =>
  knex.schema.createTable('inspections', table => {
    table.increments();
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').index();
    table.integer('mechanic_id').unsigned().notNullable().references('id').inTable('mechanics').onDelete('CASCADE').index();
    table.datetime('inspection_time', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.string('car_make');
    table.integer("year");
    table.string('location');
    table.text('description_of_problem');
    table.boolean('isConfirmed');
    table.boolean('isCompleted');


  });

exports.down = knex =>
  knex.schema.dropTableIfExists('inspections');



