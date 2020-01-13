const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get('/', async(req, res) => {
    console.log('this is request to server ', req.query.id);
    let inspectionId = req.query.id;
    const currentInspection = await db('inspections').where('id', inspectionId); // making a query to get a specific route
    console.log(currentInspection);
    res.json({ currentInspection });
  });
  return router;
};

