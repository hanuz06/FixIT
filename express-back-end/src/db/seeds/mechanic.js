
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
      "hourly_rate": 45,
      "active": true,
      "description": "I have been working on cars and trucks for over 20 years. I work with FIXit in my spare time and I absolutley love providing Calgarians with affordable car repair.",
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
      "hourly_rate": 50,
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
      "hourly_rate": 65,
      "active": true,
      "description": "Experienced, reliable mechanic ready to do almost any job in your driveway that doesn't require an engine hoist.",
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
      "hourly_rate": 55,
      "active": true,
      "description": "Winter tires need to come off? Battery Dead? Need new breaks? I'm your guy and I work full time for FixIT so I'm always available!",
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
      "hourly_rate": 65,
      "active": true,
      "description": "I beleive that car repair is a craft like any other and I strive everyday to do my absolute best for my customers.",
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
      "hourly_rate": 45,
      "active": true,
      "description": "I specailize in older vehicles, but don't worry I can check out your 2019 F150 too!",
      "avatar": "https://media.gettyimages.com/photos/at-car-service-picture-id846734982?s=612x612"
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
      "description": "I love my job! Everyday is different and fixing car repairs with Fixit is the best job I've ever had.",
      "avatar": "https://media.brstatic.com/2018/08/09160218/9-cars-that-rarely-need-a-mechanic.jpg"
    },
    {
      "id": 8,
      "first_name": "Mike",
      "last_name": "McGavin",
      "email": "granttaylor448@gmail.com",
      "password_digest": "123",
      "phone": 4037000357,
      "location": "Calgary",
      "hourly_rate": 80,
      "active": true,
      "description": "I've been fixing everything from fridges to cars since I was 6 years old. Your car will be safe with me!",
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
      "hourly_rate": 65,
      "active": true,
      "description": "Striving everyday to provide you with the best possible service.",
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
      "hourly_rate": 50,
      "active": true,
      "description": "I've always loved getting my hands dirty and I'm happy to do that fixing your vehicle!",
      "avatar": "http://www.w-t-w.org/en/wp-content/uploads/2013/05/mechanics.jpg"
    }
      ]);
    });
};
