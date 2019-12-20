
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('person').del()
    .then(function () {
      // Inserts seed entries
      return knex('person').insert([
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
