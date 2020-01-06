const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const knex = require('knex');
const {check, validationResult} = require('express-validator')

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
var Twilio = require('twilio');


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
  .then( async(response) => {  
    res.json({response})
    // Helper function that finds the mechanics phone number
    const mechanicNumber = await db('mechanics').where('id', response[0].mechanic_id).select('phone')
    
    client.messages
      .create({
        to: mechanicNumber[0].phone,
        from: '+13064001290',
        body: `Hello! We have a new service request for you. One of our clients who lives at ${response[0].location}, has a service request for their ${response[0].car_make}. Here is their description of the problem: ${response[0].description_of_problem}. Please text back only "yes" if you would like to conifirm their appointment!`
      })
      .then((res) => {
        // console.log(res.body)
        res.send(JSON.stringify({ success: true }));
      })
      .catch(err => {
        // console.log(err);
        res.send(JSON.stringify({ success: false }));
      });

      
    }) 
  .catch((error)=> console.log('error ', error))   
});

// App.post('/api/new-inspections', async (req, res) => {
//   //console.log('requeeee ', req.body)  
//   const inspectionRequest = await db('inspections').insert(req.body)
  
//   console.log(inspectionRequest)
//    res.json({inspectionRequest})

//   // .then(function(res){res.status(200).json({name: 'hello andrey')}} ) 
//   // .catch(function(error) {console.log('error ', error)})   
// });


App.post('/sms-response', async(req, res) => {

  let parseMe = req.body.Body
  let words = parseMe.split(':')
  console.log(words[0], words[1])
  console.log(words[0]== 'yes')
  
  var twiml = new Twilio.twiml.MessagingResponse();
  // ACTIVATE MECHANIC
  if (words[0] == "activate") {
    const activateMechanic = await db('mechanics').where('id', words[1]).update({active: true})
    if (activateMechanic) {
      twiml.message('You are now active!! Text us deactivate:<yourid> at anytime to stop working');
    } else {
      twiml.message('We could not activate your account! Please check your mechanic number');
  } 
  // DEACTIVATE MECHANIC
  } else if (words[0] == "deactivate") {
    const deactivateMechanic = await db('mechanics').where('id', words[1]).update({active: false})
    if (deactivateMechanic) {
      twiml.message('You are now deactived!! Thanks for all your hard work!');
    } else {
      twiml.message('We could not deactivate your account! Please check your mechanic number!');
  }
    
  // MECHANIC CONFIRMS INSPECTION
  } else if (words[0] == 'yes' ) {
    const inspectionConfirm = await db('inspections').where('id', words[1]).update({isConfirmed: true})
    if (inspectionConfirm) {
      twiml.message('We have confirmed your appointment!!');
    } else {
      twiml.message('We could not confirm your appointment! Please check your inspection number');
    }
  // MECHANIC COMPLETES INSPECTION
  }else if(words[0] == 'complete') {
    const inspectionComplete = await db('inspections').where('id', words[1]).update({isCompleted: true})
    if (inspectionComplete) {
      twiml.message('We have updated that you have completed the inspection');
    } else {
      twiml.message('We could not confirm that you completed the inspection! Please check your inspection number');
    }
  // UNHANDLED TEXT RESPONSE
  }else {
      twiml.message(`Yikes. You didn't read our instructions close enough please refer to the previous text.`);
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});





App.post('/api/user-login', async (req, res) => {
  console.log('LOGIN REQUEST RECEIVED BY PG: ', req.body) 
  
  const {email, password} = req.body
  
  const user = await db('users').where({email})

   if (!user[0] ) {
     return res.status(400).json({ message: 'User not found' })
     console.log('USER NOT FOUND BY PG')
    } 
    
  console.log('user ',  user[0])

  let isMatch = false

  if (password === user[0].password_digest){
    isMatch=true
  }

  console.log('ismatch ', isMatch)
  if (isMatch === false) {
    return res.status(404).json({ message: 'Password is incorrect' })
  } else { return res.status(200).json({ user }) }
});


App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});


