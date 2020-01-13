const Express = require('express');
const App = Express();
const http = require("http");
const BodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const {check, validationResult} = require('express-validator');
const server = http.createServer(App);
const io = require('socket.io')(server);

const bcrypt = require('bcryptjs');

const cors = require("cors");
require('dotenv').config();


App.set();
// Stripe
const stripe = require("stripe")(process.env.STRIPE_SK);
App.use(require("body-parser").text());
// Express Configuration
App.use(cors());
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
const Twilio = require('twilio');

// WEBSOCKETS LIVE UPDATING MECHANICS AND INSPECTION
io.on("connection", async socket => {

  console.log("Client connected");
  
  const interval = async() =>{
    const mechanicsOBJ = await db.raw('SELECT mechanics.id, first_name, last_name, email, password_digest, phone, location, hourly_rate, active, description, avatar, AVG(inspection_rating) FROM mechanics LEFT JOIN ratings ON mechanics.id = mechanic_id GROUP BY mechanics.id;');
    let mechanics = mechanicsOBJ.rows;
    const inspections = await db("inspections");
    socket.emit('inspections', inspections);
    socket.emit('mechanics', mechanics);
  };
  setInterval(interval, 10000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Separated Routes
const usersRoutes = require("./src/routes/users");
const mechanicsRoutes = require("./src/routes/mechanics");
const inspectionsRoutes = require("./src/routes/inspections");
const ratingsRoutes = require("./src/routes/ratings");
const smsResponseRoutes = require("./src/routes/sms-response");
const setRatingRoutes = require("./src/routes/set-rating");
const chargeRoutes = require("./src/routes/charge");
const lastInspectionRoutes = require("./src/routes/last-inspection");
const newInspectionRoutes = require("./src/routes/new-inspections");
const userLoginRoutes = require("./src/routes/user-login");
const userSignUpRoutes = require("./src/routes/user-signup");

// Mount all resource routes
App.use("/api/users", usersRoutes(db));
App.use("/api/mechanics", mechanicsRoutes(db));
App.use("/api/inspections", inspectionsRoutes(db));
App.use("/api/ratings", ratingsRoutes(db));
App.use("/api/sms-response", smsResponseRoutes(db, Twilio));
App.use("/api/set-rating", setRatingRoutes(db));
App.use("/api/charge", chargeRoutes(stripe));
App.use("/api/last-inspection", lastInspectionRoutes(db));
App.use("/api/new-inspections", newInspectionRoutes(db, client, Twilio));
App.use("/api/user-login", userLoginRoutes(db, bcrypt));
App.use("/api/user-signup", userSignUpRoutes(db, check, validationResult, bcrypt));

// Landing route
App.get('/', (req, res) => res.json({
  message: "This is the backend of Grant and Andrey's FixIT project!",
}));

App.post('/sms-response', async(req, res) => {

  let parseMe = req.body.Body;
  let words = parseMe.split(':');
  console.log(words[0], words[1]);
  console.log(words[0] === 'yes');
  
  let twiml = new Twilio.twiml.MessagingResponse();
  // ACTIVATE MECHANIC
  if (words[0] === "activate") {
    const activateMechanic = await db('mechanics').where('id', words[1]).update({active: true});
    if (activateMechanic) {
      twiml.message('You are now active!! Text us deactivate:<yourid> at anytime to stop working');

    } else {
      twiml.message('We could not activate your account! Please check your mechanic number');
    }
  // DEACTIVATE MECHANIC
  } else if (words[0] === "deactivate") {
    const deactivateMechanic = await db('mechanics').where('id', words[1]).update({active: false});
    if (deactivateMechanic) {
      twiml.message('You are now deactived!! Thanks for all your hard work!');
    } else {
      twiml.message('We could not deactivate your account! Please check your mechanic number!');
    }
    
  // MECHANIC CONFIRMS INSPECTION
  } else if (words[0] === 'yes') {
    const inspectionConfirm = await db('inspections').where('id', words[1]).update({isConfirmed: true});
    if (inspectionConfirm) {
      twiml.message('We have confirmed your appointment!!');

    } else {
      twiml.message('We could not confirm your appointment! Please check your inspection number');
    }
  // MECHANIC COMPLETES INSPECTION
  } else if (words[0] === 'complete') {
    const inspectionComplete = await db('inspections').where('id', words[1]).update({isCompleted: true});
    if (inspectionComplete) {
      twiml.message(`We have updated that you have completed the inspection. When you're ready text activate:<Your mechanic id> to Get back to work!`);
    } else {
      twiml.message('We could not confirm that you completed the inspection! Please check your inspection number');
    }
  // UNHANDLED TEXT RESPONSE
  } else {
    twiml.message(`Yikes. You didn't read our instructions close enough please refer to the previous text.`);
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

server.listen(PORT, () => {
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});