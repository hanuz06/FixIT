
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('mechanics').del()
    .then(function () {
      // Inserts seed entries
      // We are aware that this is not a safe way to store passwords
      return knex('mechanics').insert([
        {
      "id": 1,
      "first_name": "Mike",
      "last_name": "Smith",
      "email": "granttaylor448@gmail.com",
      "password_digest": "123",
      "phone": 4037000357,
      "location": "Calgary",
      "hourly_rate": 60,
      "active": true,
      "description": "I have been working on cars and trucks for over 20 years",
      "avatar": "https://www.autotrainingcentre.com/wp-content/uploads/2016/07/there’s-never-been-a-better-time-to-pursue-an-auto-mechanic-career.jpg"
    },
    {
      "id": 2,
      "first_name": "Matt",
      "last_name": "Clarke",
      "email": "granttaylor448@gmail.com",
      "password_digest": "123",
      "phone": 4037000357,
      "location": "Calgary",
      "hourly_rate": 60,
      "active": true,
      "description": "Check out my rating! I've been called the best mechanic in the city",
      "avatar": "https://www.kijiji.ca/kijijicentral/app/uploads/2017/10/5-Buyers_inspection_1280x692-1280x692-c-default.jpg"
    },
    {
      "id": 3,
      "first_name": "Dustin",
      "last_name": "Hoyt",
      "email": "granttaylor448@gmail.com",
      "password_digest": "123",
      "phone": 4037000357,
      "location": "Calgary",
      "hourly_rate": 60,
      "active": true,
      "description": "best mechanic EVER",
      "avatar": "https://cdn.trade-schools.net/static/graphics/auto-mechanic-top.jpg"
    },
    {
      "id": 4,
      "first_name": "Jim",
      "last_name": "Dewitte",
      "email": "granttaylor448@gmail.com",
      "password_digest": "123",
      "phone": 4037000357,
      "location": "Calgary",
      "hourly_rate": 60,
      "active": true,
      "description": "best mechanic EVER",
      "avatar": "https://www.readersdigest.ca/wp-content/uploads/sites/14/2016/05/insist-car-mechanic-gives-you-upfront-estimate.jpg"
    },
    {
      "id": 5,
      "first_name": "Julia",
      "last_name": "Stinson",
      "email": "granttaylor448@gmail.com",
      "password_digest": "123",
      "phone": 4037000357,
      "location": "Calgary",
      "hourly_rate": 60,
      "active": true,
      "description": "best mechanic EVER",
      "avatar": "https://images.glaciermedia.ca/polopoly_fs/1.2220624.1459375168!/fileImage/httpImage/image.jpg_gen/derivatives/landscape_804/kate-stockford.jpg"
    },
    {
      "id": 6,
      "first_name": "Eric",
      "last_name": "Sylvester",
      "email": "granttaylor448@gmail.com",
      "password_digest": "123",
      "phone": 4037000357,
      "location": "Calgary",
      "hourly_rate": 60,
      "active": true,
      "description": "best mechanic EVER",
      "avatar": "https://www.chicagotribune.com/resizer/ngXwcOgjlSIbvb9FxpZ4OE_iHRw=/960x540/filters:quality(80)/arc-goldfish-tronc-thumbnails.s3.amazonaws.com/08-08-2019/t_b9b47a9d6fd745b5aa6e1b3196407c00_name_fl_ne_auto_tech_shortage_01_scaled.jpg"
    },
    {
      "id": 7,
      "first_name": "Randall",
      "last_name": "McSweeney",
      "email": "granttaylor448@gmail.com",
      "password_digest": "123",
      "phone": 4037000357,
      "location": "Calgary",
      "hourly_rate": 60,
      "active": true,
      "description": "best mechanic EVER",
      "avatar": "https://media.brstatic.com/2018/08/09160218/9-cars-that-rarely-need-a-mechanic.jpg"
    },
    {
      "id": 8,
      "first_name": "Shooter",
      "last_name": "McGavin",
      "email": "granttaylor448@gmail.com",
      "password_digest": "123",
      "phone": 4037000357,
      "location": "Calgary",
      "hourly_rate": 60,
      "active": true,
      "description": "best mechanic EVER",
      "avatar": "https://www.ziprecruiter.com/blog/zrs-0001/blog/wp-content/uploads/2017/07/auto_mechanic-628x418.jpg"
    },
    {
      "id": 9,
      "first_name": "John",
      "last_name": "Grey",
      "email": "granttaylor448@gmail.com",
      "password_digest": "123",
      "phone": 4037000357,
      "location": "Calgary",
      "hourly_rate": 60,
      "active": true,
      "description": "best mechanic EVER",
      "avatar": "http://knowhow.napaonline.com/wp-content/uploads/2017/02/routine_oil_change.jpg"
    },
    {
      "id": 10,
      "first_name": "Rianne",
      "last_name": "Struik",
      "email": "granttaylor448@gmail.com",
      "password_digest": "123",
      "phone": 4037000357,
      "location": "Calgary",
      "hourly_rate": 60,
      "active": true,
      "description": "best mechanic EVER",
      "avatar": "http://www.w-t-w.org/en/wp-content/uploads/2013/05/mechanics.jpg"
    }
      ]);
    });
};
