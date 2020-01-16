const express = require('express');
const router  = express.Router();
const Twilio = require('twilio');

module.exports = (db) => {
  router.post('/', async(req, res) => {
 
    let parseMe = req.body.Body;
    let words = parseMe.split(':');
    console.log(words[0], words[1]);
    console.log(words[0] === 'yes');
    
    let twiml = new Twilio.twiml.MessagingResponse();
    // ACTIVATE MECHANIC
    if (words[0].toLowerCase() === "activate") {
      const activateMechanic = await db('mechanics').where('id', words[1]).update({active: true});
      if (activateMechanic) {
        twiml.message('You are now active!! Text us deactivate:<yourid> at anytime to stop working');
  
      } else {
        twiml.message('We could not activate your account! Please check your mechanic number');
      }
    // DEACTIVATE MECHANIC
    } else if (words[0].toLowerCase() === "deactivate") {
      const deactivateMechanic = await db('mechanics').where('id', words[1]).update({active: false});
      if (deactivateMechanic) {
        twiml.message('You are now deactived!! Thanks for all your hard work!');
      } else {
        twiml.message('We could not deactivate your account! Please check your mechanic number!');
      }
      
    // MECHANIC CONFIRMS INSPECTION
    } else if (words[0].toLowerCase() === 'yes') {
      const inspectionConfirm = await db('inspections').where('id', words[1]).update({isConfirmed: true});
      if (inspectionConfirm) {
        twiml.message('We have confirmed your inspection! When you finish the inspection text us "complete:<yourinspection#>" to complete the transaction');
  
      } else {
        twiml.message('We could not confirm your appointment! Please check your inspection number');
      }
    // MECHANIC COMPLETES INSPECTION
    } else if (words[0].toLowerCase() === 'complete') {
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
  return router;
};
