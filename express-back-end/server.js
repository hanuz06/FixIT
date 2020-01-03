const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const knex = require('knex');

// Express Configuration

App.use(BodyParser.json());
App.use(BodyParser.urlencoded({ extended: false }));
App.use(Express.static('public'));
//DB
const db = require("./src/db/db.js");

// Twilio
const client = require('twilio')(
  process.env.TWILIO_ACCOUT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const MessagingResponse = require('twilio').twiml.MessagingResponse;


// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

// Path 
App.get('/api/mechanics', async (req, res) => {
  const mechanics = await db("mechanics"); // making a query to get all todos
  res.json({ mechanics });
});

App.get('/api/users', async (req, res) => {
  const users = await db("users"); // making a query to get all todos
  res.json({ users });
});

App.get('/api/ratings', async (req, res) => {
  const ratings = await db("ratings"); // making a query to get all todos
  res.json({ ratings });
});

App.get('/api/inspections', async (req, res) => {
 
  const inspections = await db("inspections"); // making a query to get all todos
  res.json({ inspections });
});


App.post('/api/new-inspections', (req, res) => {
  res.header('Content-Type', 'application/json');
  console.log('requeeee ', req.body)  
  db('inspections').insert(req.body)
  .returning('*') 
  // START TWILIO MESSAGE
  .then( async(res) => {  
    // Helper function that finds the mechanics phone number
    const mechanicNumber = await db('mechanics').where('id', res[0].mechanic_id).select('phone')
    
    client.messages
      .create({
        to: mechanicNumber[0].phone,
        from: '+13064001290',
        body: `Hello! We have a new service request for you. One of our clients who lives at 563 WoodPark Cres SW Calgary AB, has a service request for their ${res[0].car_make}. Here is their description of the problem: ${res[0].description_of_problem}. Please text back only "yes" if you would like to conifirm their appointment!`
      })
      .then((res) => {
        console.log(res.body)
      })
      .catch(err => {
        console.log(err);
        // res.send(JSON.stringify({ success: false }));
      });
    }) 
  .catch((error)=> console.log('error ', error))   
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});


App.post('/sms-response', (req, res) => {
  

  const twiml = new MessagingResponse();

  // Access the message body and the number it was sent from.
  console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
    
})
