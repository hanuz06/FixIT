
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('inspections').del()
    .then(function () {
      //Inserts seed entries
      return knex('inspections').insert([
        {id: 999, 
        user_id: 1,
        mechanic_id: 1,
        car_make: "Honda CRV",
        year: "1993",
        location:'calgary',
        description_of_problem: "It won't start!",
        isConfirmed: false,
        isCompleted: false
      },
      ]);      
    });
};
