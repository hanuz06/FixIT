
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ratings').del()
    .then(function () {
      // Inserts seed entries
      return knex('ratings').insert([
        {id: 1, 
        user_id: 1,
        mechanic_id: 1,
        inspection_id: 1,
        rating: 4
      },
      ]);
    });
};
