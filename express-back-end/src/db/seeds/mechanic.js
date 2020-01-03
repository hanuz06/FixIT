
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('mechanics').del()
    .then(function () {
      // Inserts seed entries
      return knex('mechanics').insert([
        {
      "id": 1,
      "first_name": "Mike",
      "last_name": "Smith1",
      "email": "granttaylor448@gmail.com",
      "password_digest": "123",
      "phone": 4037000357,
      "location": "Calgary",
      "hourly_rate": 60,
      "active": true,
      "description": "best mechanic EVER",
      "avatar": "https://www.autotrainingcentre.com/wp-content/uploads/2016/07/there’s-never-been-a-better-time-to-pursue-an-auto-mechanic-career.jpg"
    },
    {
      "id": 2,
      "first_name": "Mark",
      "last_name": "Smith2",
      "email": "granttaylor448@gmail.com",
      "password_digest": "123",
      "phone": 4037000357,
      "location": "Calgary",
      "hourly_rate": 60,
      "active": true,
      "description": "best mechanic EVER",
      "avatar": "https://www.autotrainingcentre.com/wp-content/uploads/2016/07/there’s-never-been-a-better-time-to-pursue-an-auto-mechanic-career.jpg"
    },
    {
      "id": 3,
      "first_name": "Mark",
      "last_name": "Smith3",
      "email": "granttaylor448@gmail.com",
      "password_digest": "123",
      "phone": 4037000357,
      "location": "Calgary",
      "hourly_rate": 60,
      "active": true,
      "description": "best mechanic EVER",
      "avatar": "https://www.autotrainingcentre.com/wp-content/uploads/2016/07/there’s-never-been-a-better-time-to-pursue-an-auto-mechanic-career.jpg"
    },
    {
      "id": 4,
      "first_name": "Mike",
      "last_name": "Smith4",
      "email": "granttaylor448@gmail.com",
      "password_digest": "123",
      "phone": 4037000357,
      "location": "Calgary",
      "hourly_rate": 60,
      "active": true,
      "description": "best mechanic EVER",
      "avatar": "https://www.autotrainingcentre.com/wp-content/uploads/2016/07/there’s-never-been-a-better-time-to-pursue-an-auto-mechanic-career.jpg"
    },
    {
      "id": 5,
      "first_name": "Mark",
      "last_name": "Smith5",
      "email": "granttaylor448@gmail.com",
      "password_digest": "123",
      "phone": 4037000357,
      "location": "Calgary",
      "hourly_rate": 60,
      "active": true,
      "description": "best mechanic EVER",
      "avatar": "https://www.autotrainingcentre.com/wp-content/uploads/2016/07/there’s-never-been-a-better-time-to-pursue-an-auto-mechanic-career.jpg"
    },
    {
      "id": 6,
      "first_name": "Mike",
      "last_name": "Smith6",
      "email": "granttaylor448@gmail.com",
      "password_digest": "123",
      "phone": 4037000357,
      "location": "Calgary",
      "hourly_rate": 60,
      "active": true,
      "description": "best mechanic EVER",
      "avatar": "https://www.autotrainingcentre.com/wp-content/uploads/2016/07/there’s-never-been-a-better-time-to-pursue-an-auto-mechanic-career.jpg"
    },
    {
      "id": 7,
      "first_name": "Mark",
      "last_name": "Smith7",
      "email": "granttaylor448@gmail.com",
      "password_digest": "123",
      "phone": 4037000357,
      "location": "Calgary",
      "hourly_rate": 60,
      "active": true,
      "description": "best mechanic EVER",
      "avatar": "https://www.autotrainingcentre.com/wp-content/uploads/2016/07/there’s-never-been-a-better-time-to-pursue-an-auto-mechanic-career.jpg"
    }
      ]);
    });
};
