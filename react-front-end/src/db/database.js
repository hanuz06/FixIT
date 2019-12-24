export const database = {
  mechanics: [{
      id: 1,
      first_name: "Mike",
      last_name: "Smith",
      email: "granttaylor448@gmail.com",
      password_digest: "123",
      phone: 4037000357,
      location: "Calgary",
      hourly_rate: 60,
      active: true,
      description: "best mechanic EVER",
      avatar: "https://www.autotrainingcentre.com/wp-content/uploads/2016/07/there’s-never-been-a-better-time-to-pursue-an-auto-mechanic-career.jpg"
    },
    {
      id: 2,
      first_name: "Mark",
      last_name: "Smith",
      email: "granttaylor448@gmail.com",
      password_digest: "123",
      phone: 4037000357,
      location: "Calgary",
      hourly_rate: 60,
      active: true,
      description: "best mechanic EVER",
      avatar: "https://www.autotrainingcentre.com/wp-content/uploads/2016/07/there’s-never-been-a-better-time-to-pursue-an-auto-mechanic-career.jpg"
    }
  ],
  "ratings": [{
    "id": 1,
    "user_id": 1,
    "mechanic_id": 1,
    "inspection_id": 1,
    "rating": "5"
  }],
  "users": [{
    "id": 1,
    "first_name": "Grant",
    "last_name": "Taylor",
    "email": "granttaylor448@gmail.com",
    "password_digest": "123",
    "phone": "4037000357",
    "location": "Calgary"
  }],
  "inspections": [{
    "id": 1,
    "user_id": 1,
    "mechanic_id": 1,
    "inspection_time": "2019-12-20T22:43:29.794Z",
    "car_make": "Honda CRV",
    "year": 1993,
    "description_of_problem": "It wont start!",
    "isConfirmed": false,
    "isCompleted": false
  }]
}