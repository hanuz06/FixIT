
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
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
        {id: 2,
          first_name: "John",
          last_name: "Bayron",
          email: "jbayron@ya.com",
          password_digest: "123",
          phone: 8259940224,
          location: "Calgary"
        }
      ]);
    });
};
