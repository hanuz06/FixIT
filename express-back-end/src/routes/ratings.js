const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', async(req, res) => {
    const ratings = await db("ratings"); // making a query to get all ratings
    res.json({ ratings });
  });
  return router;
};
