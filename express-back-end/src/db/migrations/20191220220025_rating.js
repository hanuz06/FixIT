
exports.up = knex =>
  knex.schema.createTable('ratings', table => {
    table.increments();
    
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').index();
    table.integer('mechanic_id').unsigned().notNullable().references('id').inTable('mechanics').onDelete('CASCADE').index();
    table.integer('inspection_id').unsigned().notNullable().references('id').inTable('inspections').onDelete('CASCADE').index();
    table.integer('inspection_rating');
});


exports.down = knex =>
  knex.schema.dropTableIfExists('ratings')
