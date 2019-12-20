
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('mechanic').del()
    .then(function () {
      // Inserts seed entries
      return knex('mechanic').insert([
        {id: 1, 
          first_name: "Mike", 
          last_name: "Smith",
          email: "granttaylor448@gmail.com",
          password_digest: "123",
          phone: 4037000357,
          location: "Calgary",
          hourly_rate: 60,
          active: true,
          description: "best mechanic EVER",
          avatar: "pic.png",
          location: "Calgary"
        },
        {id: 2, 
          first_name: "Mark", 
          last_name: "Smith",
          email: "granttaylor448@gmail.com",
          password_digest: "123",
          phone: 4037000357,
          location: "Calgary",
          hourly_rate: 60,
          active: true,
          description: "best mechanic EVER",
          avatar: "pic.png",
          location: "Calgary"
        },
        {id: 3, 
          first_name: "Matt", 
          last_name: "Smith",
          email: "granttaylor448@gmail.com",
          password_digest: "123",
          phone: 4037000357,
          location: "Calgary",
          hourly_rate: 60,
          active: true,
          description: "best mechanic EVER",
          avatar: "pic.png",
          location: "Calgary"
        }
      ]);
    });
};
