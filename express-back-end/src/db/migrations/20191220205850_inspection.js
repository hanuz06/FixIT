
exports.up = knex =>
knex.schema.createTable('inspections', table => {
  table.increments();
  table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').index();
  table.integer('mechanic_id').unsigned().notNullable().references('id').inTable('mechanics').onDelete('CASCADE').index();
  table.datetime('inspection_time', { precision: 6 }).defaultTo(knex.fn.now(6))
  table.string('car_make')
  table.integer("year")
  table.text('description_of_problem');
  table.boolean('isConfirmed');
  table.boolean('isCompleted');


});

exports.down = knex =>
  knex.schema.dropTableIfExists('inspections')


// exports.up = knex =>
//   knex.schema.createTable('ratings', table => {
//     table.increments();
    
//     table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').index();
//     table.integer('mechanic_id').unsigned().notNullable().references('id').inTable('mechanics').onDelete('CASCADE').index();
//     table.integer('inspection_id').unsigned().notNullable().references('id').inTable('inspections').onDelete('CASCADE').index();
//     table.text('rating');
// });


// exports.down = knex =>
//   knex.schema.dropTableIfExists('ratings')


