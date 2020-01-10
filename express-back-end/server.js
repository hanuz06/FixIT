const Express = require('express');
const App = Express();
const http = require("http");
const BodyParser = require('body-parser');
const PORT = 8080;
const knex = require('knex');
const {check, validationResult} = require('express-validator')
const server = http.createServer(App);
const io = require('socket.io')(server)


const cors = require("cors")

// Express Configuration
App.use(cors())
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

// WEBSOCKETS LIVE UPDATING MECHANICS AND INSPECTION
io.on("connection", async socket => {

  console.log("Client connected");
  
  const interval = async () =>{
    const mechanicsOBJ = await db.raw('SELECT mechanics.id, first_name, last_name, email, password_digest, phone, location, hourly_rate, active, description, avatar, AVG(inspection_rating) FROM mechanics LEFT JOIN ratings ON mechanics.id = mechanic_id GROUP BY mechanics.id;')
  let mechanics = mechanicsOBJ.rows
    const inspections = await db("inspections");
    socket.emit('inspections', inspections);
    socket.emit('mechanics', mechanics) 
  }
  setInterval(interval, 10000);

  socket.on("disconnect", () => {
    // clearInterval(tweets);
    console.log("Client disconnected");
  });
});

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

// Path 
App.get('/api/mechanics', async (req, res) => {

  const mechanicsOBJ = await db.raw('SELECT mechanics.id, first_name, last_name, email, password_digest, phone, location, hourly_rate, active, description, avatar, AVG(inspection_rating) FROM mechanics LEFT JOIN ratings ON mechanics.id = mechanic_id GROUP BY mechanics.id;')
  let mechanics = mechanicsOBJ.rows
  res.json({ mechanics });

  //const mechanics = await db("mechanics")
  
  // .leftJoin('ratings', 'mechanics.id', 'ratings.mechanic_id').select(knex.raw('avg(rating)'));
   // making a query to get all todos
  
  // res.json({ mechanics });
});

App.get('/api/users', async (req, res) => {
  const users = await db("users"); // making a query to get all todos
  res.json({ users });
});

App.get('/api/ratings', async (req, res) => {
  const ratings = await db("ratings"); // making a query to get all todos
//  const mechanicsRating = await db('mechanics').join('ratings', 'mechanics.id', 'ratings.mechanic_id').select('rating', 'mechanic_id')
  
  res.json({ ratings });
});

App.get('/api/inspections', async (req, res) => {
 
  const inspections = await db("inspections"); // making a query to get all todos
  res.json({ inspections });
});

App.post('/api/new-inspections', (req, res) => {
  res.header('Content-Type', 'application/json');
  //console.log('requeeee ', req.body)  
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
        from: '+15873276729',
        body: `New Inspection Request #${response[0].id} Hello! We have a new service request for you. One of our clients who lives at ${response[0].location}, has a service request for their ${response[0].car_make}. Here is their description of the problem: ${response[0].description_of_problem}. Please text back only "yes" if you would like to conifirm their appointment!`
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

App.get('/api/last-inspection', async (req, res) => {
  console.log('this is request to server ', req.query.id)
  let inspectionId = req.query.id
  const currentInspection = await db('inspections').where('id', inspectionId); // making a query to get all todos
  console.log(currentInspection)
  res.json({ currentInspection });
});

App.post('/api/set-rating', async (req, res) => {
  console.log('RATING REQUEST ', req.body)  
  const ratingRequest = await db('ratings').insert(req.body)
  
  console.log('ratingRequest ',ratingRequest)
   res.json({ratingRequest})

  //  ratingRequest.then(res => {res.status(200).json({ratingRequest})})
  // .catch(error=> {error})   
});

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
  console.log('USER ', user)

   if (!user[0] ) {
     return res.status(400).json({ message: 'User not found' })
     console.log('USER NOT FOUND BY PG')
    } 
 
   let isMatch = false

  if (password === user[0].password_digest){
    isMatch=true
  }

  //console.log('ismatch ', isMatch)
  if (isMatch === false) {
    return res.status(404).json({ message: 'Password is incorrect' })
  } else { return res.status(200).json({ user }) }
});


App.post('/api/user-signup',  async (req, res) => {
    
  const findUser = await db('users').where({email: req.body.email})
  
  console.log('findUser ', findUser.length)  
   if (findUser.length !== 0) {
     console.log('EMAIL EXISTS')
     return res.status(401).json({ message: 'Email exists' })
    } 

    //console.log('user not found...')
  const userSignUpData = await db('users').insert(req.body, (['id', 'first_name', 'last_name']))  
   
  res.status(200).json({userSignUpData, message: 'User successfully signed up' })  
});


server.listen(PORT, () => {
//App.listen(PORT, () => { 
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});


