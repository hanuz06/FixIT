const express = require('express');
const router  = express.Router();

module.exports = (db, client) => {
  router.post('/', async(req, res) => {
    res.header('Content-Type', 'application/json');
    await db('mechanics').where('id', req.body.mechanic_id).update({active: false});
    
    db('inspections').insert(req.body)
      .returning('*')
    // START TWILIO MESSAGE
      .then(async(response) => {
        res.json({response});
        // Helper function that finds the mechanics phone number
        const mechanicNumber = await db('mechanics').where('id', response[0].mechanic_id).select('phone');
      
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
      .catch((error)=> console.log('error ', error));
  });
  return router;
};
