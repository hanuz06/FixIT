
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, 
        first_name: "Grant", 
        last_name: "Taylor",
        email: "granttaylor448@gmail.com",
        password_digest: "123",
        phone: 4037000357,
        location: "Calgary"
      },
        
      ]);
    });
};
