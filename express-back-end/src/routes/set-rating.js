const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post('/', async(req, res) => {
    // console.log('RATING REQUEST ', req.body);
    const ratingRequest = await db('ratings').insert(req.body);
    
    // console.log('ratingRequest ',ratingRequest);
    res.json({ratingRequest});
  });
  return router;
};