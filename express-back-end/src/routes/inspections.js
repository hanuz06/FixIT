const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', async(req, res) => {
 
    const inspections = await db("inspections"); // making a query to get all inspections
    res.json({ inspections });
  });
  return router;
};
